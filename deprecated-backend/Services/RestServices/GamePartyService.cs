using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.GameParty;
using DataTransferObjects.Rest.Modificator;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.InternalServices;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class GamePartyService: BaseRestService<GamePartyResponseDto, GamePartyEntity>, 
    IRestService<CreateGamePartyRequestDto, UpdateGamePartyRequestDto, GamePartyResponseDto>
{
    public GamePartyService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<GamePartyEntity> filterService) : base(dbContext, mapper, filterService)
    {
    }

    public async Task<GamePartyResponseDto> Add(CreateGamePartyRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = Mapper.Map<GamePartyEntity>(requestDto);
            
            entity.Name = requestDto.Name;
            entity.TurnDuration = requestDto.TurnDuration;
            entity.TurnsCompleted = requestDto.TurnsCompleted;
            entity.WinnerUserId = requestDto.WinnerUserId;
            
            await ServiceHelper.AddEntity(DbContext, DbSet, entity);
            return Mapper.Map<GamePartyResponseDto>(entity);
        });
    }

    public Task<GamePartyResponseDto> Update(long id, UpdateGamePartyRequestDto requestDto)
    {
        throw new BadRequestException("Cannot update game party");
    }

    public override Task<GamePartyResponseDto> Delete(long id)
    {
        throw new BadRequestException("Cannot delete game party");
    }
}