using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.GameVariable;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.InternalServices;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class GameVariableService : BaseRestService<GameVariableResponseDto, GameVariableEntity>, 
    IRestService<CreateGameVariableRequestDto, UpdateGameVariableRequestDto, GameVariableResponseDto>
{
    public GameVariableService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<GameVariableEntity> filterService) 
        : base(dbContext, mapper, filterService)
    {
    }

    public Task<GameVariableResponseDto> Add(CreateGameVariableRequestDto requestDto)
    {
        throw new BadRequestException("Cannot add game variable");
    }

    public async Task<GameVariableResponseDto> Update(long id, UpdateGameVariableRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.DefaultValue = requestDto.DefaultValue;
            
            await ServiceHelper.UpdateEntity(DbContext, DbSet, entity);
            return Mapper.Map<GameVariableResponseDto>(entity);
        });
    }

    public override Task<GameVariableResponseDto> Delete(long id)
    {
        throw new BadRequestException("Cannot delete game variable");
    }
}