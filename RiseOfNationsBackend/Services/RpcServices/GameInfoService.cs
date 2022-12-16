using AutoMapper;
using DataAccess;
using DataTransferObjects.Rest.GameVariable;
using DataTransferObjects.Rest.Modificator;
using DataTransferObjects.Rpc.GameInfo;
using Microsoft.EntityFrameworkCore;
using Services.RpcServices.Interfaces;

namespace Services.RpcServices;

public class GameInfoService : IGameInfoService
{
    public GameInfoService(AppDbContext dbContext, IMapper mapper)
    {
        DbContext = dbContext;
        Mapper = mapper;
    }

    public AppDbContext DbContext { get; set; }
    public IMapper Mapper { get; set; }
    
    public async Task<GameInfoResponseDto> GetGameInfo()
    {
        var gameVariables = await DbContext.GameVariableEntities.OrderBy(v => v.Id).ToListAsync();
        var modificators = await DbContext.ModificatorEntities.ToListAsync();

        return new GameInfoResponseDto
        {
            GameVariables =  Mapper.Map<ICollection<GameVariableResponseDto>>(gameVariables),
            Modificators = Mapper.Map<ICollection<ModificatorResponseDto>>(modificators),
        };
    }
}