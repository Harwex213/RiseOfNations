using Microsoft.Extensions.DependencyInjection;
using DataAccess.Entities;
using DataTransferObjects.Rest.User;
using Services.FilterServices;
using Services.FilterServices.Interfaces;
using Services.RestServices;
using Services.RestServices.Interfaces;

namespace Services;

public static class ServicesConfiguration
{
    private static IServiceCollection Services { get; set; }
    
    public static void Configure(IServiceCollection services)
    {
        Services = services;
        
        ConfigureAutomapperProfiles();
        ConfigureFilterServices();
        ConfigureRestServices();
    }

    private static void ConfigureAutomapperProfiles()
    {
        Services.AddAutoMapper(typeof(ServicesConfiguration).Assembly);
    }

    private static void ConfigureFilterServices()
    {
        Services.AddScoped<IEntityFilterService<UserEntity>, UserFilterService>();
    }
    
    private static void ConfigureRestServices()
    {
        Services.AddScoped<IRestService<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto>, UserService>();
    }
}