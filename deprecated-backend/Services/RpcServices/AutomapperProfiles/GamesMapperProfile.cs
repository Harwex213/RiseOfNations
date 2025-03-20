using AutoMapper;
using DataTransferObjects.Rpc.Games;
using DataTransferObjects.Rpc.Games.RequestDto;
using DataTransferObjects.Rpc.Games.ResponseDto;
using Services.RpcServices.GameServiceEntities;

namespace Services.RpcServices.AutomapperProfiles;

public class GamesMapperProfile : Profile
{
    public GamesMapperProfile()
    {
        // in
        CreateMap<CreateGameDto, Game>();
        CreateMap<JoinGameDto, Game>();
        CreateMap<PlayerDto, Player>();
        
        // out
        CreateMap<Game, GameResponseDto>();
        CreateMap<Game, DeletedGameResponseDto>();
        CreateMap<Player, PlayerResponseDto>();
    }
}