using AutoMapper;
using DataAccess.Entities;
using DataTransferObjects.Rest.GameVariable;

namespace Services.RestServices.AutomapperProfiles;

public class GameVariableProfile : Profile
{
    public GameVariableProfile()
    {
        CreateMap<CreateGameVariableRequestDto, GameVariableEntity>();
        CreateMap<UpdateGameVariableRequestDto, GameVariableEntity>();
        CreateMap<GameVariableEntity, GameVariableResponseDto>();
    }
}