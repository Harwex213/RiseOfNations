using AutoMapper;
using DataTransferObjects.Rest.Realm;
using DataTransferObjects.Rpc.Games.RequestDto;
using WebApi.Dtos.Games;
using WebApi.Dtos.Realms;

namespace WebApi.Dtos.AutomapperProfiles;

public class GamesAutomapperProfile : Profile
{
    public GamesAutomapperProfile()
    {
        // in
        CreateMap<CreateGameRequest, CreateGameDto>();
        CreateMap<CreateRealmRequest, CreateRealmRequestDto>();
        CreateMap<CreateRealmRequest, UpdateRealmRequestDto>();
    }
}