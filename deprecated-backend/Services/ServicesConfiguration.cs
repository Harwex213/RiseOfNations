using Microsoft.Extensions.DependencyInjection;
using DataAccess.Entities;
using DataTransferObjects.Rest.GameParty;
using DataTransferObjects.Rest.GameVariable;
using DataTransferObjects.Rest.Modificator;
using DataTransferObjects.Rest.Realm;
using DataTransferObjects.Rest.User;
using Services.FilterServices;
using Services.FilterServices.Interfaces;
using Services.InternalServices;
using Services.InternalServices.Interfaces;
using Services.RestServices;
using Services.RestServices.Interfaces;
using Services.RpcServices;
using Services.RpcServices.Interfaces;

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
        ConfigureRpcServices();
        ConfigureInternalServices();
    }

    private static void ConfigureAutomapperProfiles()
    {
        Services.AddAutoMapper(typeof(ServicesConfiguration).Assembly);
    }

    private static void ConfigureFilterServices()
    {
        Services.AddScoped<IEntityFilterService<UserEntity>, UserFilterService>();
        Services.AddScoped<IEntityFilterService<RealmEntity>, RealmFilterService>();
        Services.AddScoped<IEntityFilterService<ModificatorEntity>, ModificatorFilterService>();
        Services.AddScoped<IEntityFilterService<GameVariableEntity>, GameVariableFilterService>();
        Services.AddScoped<IEntityFilterService<GamePartyEntity>, GamePartyFilterService>();
    }
    
    private static void ConfigureRestServices()
    {
        Services.AddScoped<IRestService<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto>, UserService>();
        Services.AddScoped<IRestService<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto>, RealmService>();
        Services.AddScoped<IRestService<CreateModificatorRequestDto, UpdateModificatorRequestDto, ModificatorResponseDto>, ModificatorService>();
        Services.AddScoped<IRestService<CreateGameVariableRequestDto, UpdateGameVariableRequestDto, GameVariableResponseDto>, GameVariableService>();
        Services.AddScoped<IRestService<CreateGamePartyRequestDto, UpdateGamePartyRequestDto, GamePartyResponseDto>, GamePartyService>();
    }

    private static void ConfigureRpcServices()
    {
        Services.AddScoped<IAuthService, AuthService>();
        Services.AddScoped<IGameInfoService, GameInfoService>();
        Services.AddScoped<IRealmsService, RealmsService>();
        Services.AddSingleton<IGamesService, GamesService>();
    }
    
    private static void ConfigureInternalServices()
    {
        Services.AddSingleton<IPasswordHasher, PasswordHasher>();
        Services.AddSingleton<IFileUploader, FileUploader>();
    }
}