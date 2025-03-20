using Common.Constants.Configuration;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Services;
using WebApi.Authentication;
using WebApi.Constants;
using WebApi.Middleware;
using WebApi.Services;

namespace WebApi;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    private IConfiguration Configuration { get; }
    
    public void ConfigureServices(IServiceCollection services)
    {
        AppDbContext.AddToContainer(services, Configuration);
        AddServices(services);
        services.AddAutoMapper(typeof(Startup).Assembly);
        ServicesConfiguration.Configure(services);
        
        services.AddDistributedMemoryCache();
        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromDays(1);

            options.Cookie.IsEssential = true;
            options.Cookie.HttpOnly = false;
            // options.Cookie.SecurePolicy = CookieSecurePolicy.None;
            // options.Cookie.SameSite = SameSiteMode.None;
        });
        
        services.AddOptions<SessionAuthenticationSchemeOptions>();
        services.AddAuthentication(SessionAuthenticationSchemeOptions.SchemeName)
            .AddScheme<SessionAuthenticationSchemeOptions, SessionAuthenticationSchemeHandler>(
                SessionAuthenticationSchemeOptions.SchemeName, null
            );

        services.AddControllers()
            .AddNewtonsoftJson();
        
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(o =>
        {
            o.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
        });
    }

    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        Console.WriteLine(Configuration["ConnectionStrings.DefaultConnection"]);
        
        FileUploaderConfiguration.WebRootPath = env.WebRootPath;
        JsonConvert.DefaultSettings = () => new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };
        
        UpdateDatabaseMigrations(app.Services);
        
        // if (app.Environment.IsDevelopment())
        // {
        //     app.UseSwagger();
        //     app.UseSwaggerUI();
        //
        //     app.UseCors(b =>
        //     {
        //         b.SetIsOriginAllowed(_ => true);
        //         b.AllowAnyHeader();
        //         b.AllowAnyMethod();
        //         b.AllowCredentials();
        //         b.WithExposedHeaders("Content-Range");
        //     });
        // }
        //
        // if (app.Environment.IsProduction())
        // {
        //     app.UseHsts();
        // }
        
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseCors(b =>
        {
            b.SetIsOriginAllowed(_ => true);
            b.AllowAnyHeader();
            b.AllowAnyMethod();
            b.AllowCredentials();
            b.WithExposedHeaders("Content-Range");
        });

        // app.UseHttpsRedirection();
        app.UseStaticFiles(RoutesConfiguration.StaticFilesRoute);
        app.UseSession();
        app.UseMiddleware<ErrorHandlerMiddleware>();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
    }

    private void UpdateDatabaseMigrations(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();    
        dbContext.Database.Migrate();
    }

    private void AddServices(IServiceCollection services)
    {
        services.AddSingleton<IGameListSseService, GameListSseService>();
        services.AddSingleton<IGameSseService, GameSseService>();
    }
}