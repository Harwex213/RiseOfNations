using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.Modificator;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.InternalServices;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class ModificatorService : BaseRestService<ModificatorResponseDto, ModificatorEntity>, 
    IRestService<CreateModificatorRequestDto, UpdateModificatorRequestDto, ModificatorResponseDto>
{
    public ModificatorService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<ModificatorEntity> filterService) 
        : base(dbContext, mapper, filterService)
    {
    }
    
    public async Task<ModificatorResponseDto> Add(CreateModificatorRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = Mapper.Map<ModificatorEntity>(requestDto);
            
            entity.Name = requestDto.Name;
            entity.Description = requestDto.Description;
            entity.AffectedGameVariableId = requestDto.AffectedGameVariableId;
            entity.ModificatorValue = requestDto.ModificatorValue;
            
            await ServiceHelper.AddEntity(DbContext, DbSet, entity);
            return Mapper.Map<ModificatorResponseDto>(entity);
        });
    }

    public async Task<ModificatorResponseDto> Update(long id, UpdateModificatorRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.Name = requestDto.Name;
            entity.Description = requestDto.Description;
            entity.AffectedGameVariableId = requestDto.AffectedGameVariableId;
            entity.ModificatorValue = requestDto.ModificatorValue;
            
            await ServiceHelper.UpdateEntity(DbContext, DbSet, entity);
            return Mapper.Map<ModificatorResponseDto>(entity);
        });
    }
}