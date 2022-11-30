using DataAccess;
using Microsoft.EntityFrameworkCore;
using Services;
using WebApi.Middleware;

namespace WebApi;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
        //
        // Console.WriteLine("Configuration test: " + Configuration["Test"]);
    }

    private IConfiguration Configuration { get; }
    
    public void ConfigureServices(IServiceCollection services)
    {
        AppDbContext.AddToContainer(services, Configuration);
        
        ServicesConfiguration.Configure(services);
        
        services.AddControllers();
            // .ConfigureApplicationPartManager(m => m.FeatureProviders.Add(new GenericRestControllerFeatureProvider()));
        
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(o =>
        {
            o.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
        });
    }

    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors(b =>
            {
                b.AllowAnyOrigin();
                b.AllowAnyHeader();
                b.AllowAnyMethod();
                b.WithExposedHeaders("Content-Range");
            });
        }

        if (app.Environment.IsProduction())
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseMiddleware<ErrorHandlerMiddleware>();
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