using AutoMapper;
using DataTransferObjects.Rpc.Games.RequestDto;
using WebApi.Dtos.Games;

namespace WebApi.Dtos.AutomapperProfiles;

public class GamesAutomapperProfile : Profile
{
    public GamesAutomapperProfile()
    {
        // in
        CreateMap<CreateGameRequest, CreateGameDto>();
    }
}