using AutoMapper;
using DataAccess.Entities;
using DataTransferObjects.Rest.GameParty;

namespace Services.RestServices.AutomapperProfiles;

public class GamePartyProfile : Profile
{
    public GamePartyProfile()
    {
        CreateMap<CreateGamePartyRequestDto, GamePartyEntity>();
        CreateMap<GamePartyEntity, GamePartyResponseDto>();
    }
}