using Common.Constants.Configuration;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Services;
using WebApi.Authentication;
using WebApi.Middleware;

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
        
        ServicesConfiguration.Configure(services);
        
        services.AddDistributedMemoryCache();

        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromDays(1);

            options.Cookie.IsEssential = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
            options.Cookie.SameSite = SameSiteMode.None;
        });
        
        services.AddOptions<SessionAuthenticationSchemeOptions>();
        services.AddAuthentication(SessionAuthenticationSchemeOptions.SchemeName)
            .AddScheme<SessionAuthenticationSchemeOptions, SessionAuthenticationSchemeHandler>(
                SessionAuthenticationSchemeOptions.SchemeName, null
            );

        services.AddControllers();
        
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(o =>
        {
            o.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
        });
    }

    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        FileUploaderConfiguration.WebRootPath = env.WebRootPath;
        
        if (app.Environment.IsDevelopment())
        {
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
        }

        if (app.Environment.IsProduction())
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles("/static");
        app.UseSession();
        app.UseMiddleware<ErrorHandlerMiddleware>();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
    }
    
    public void OnBuild(WebApplication app)
    {
        UpdateDatabaseMigrations(app.Services);
    }

    private void UpdateDatabaseMigrations(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();    
        dbContext.Database.Migrate();
    }
}