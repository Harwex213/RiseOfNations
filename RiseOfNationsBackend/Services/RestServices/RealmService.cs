using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.Realm;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class RealmService : BaseRestService<RealmResponseDto, RealmEntity>, 
    IRestService<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto>
{
    public RealmService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<RealmEntity> filterService) 
        : base(dbContext, mapper, filterService)
    {
    }
    
    public async Task<RealmResponseDto> Add(CreateRealmRequestDto requestDto)
    {
        return await RestServiceHelper.Execute(async () =>
        {
            var entity = Mapper.Map<RealmEntity>(requestDto);
            
            entity.Name = requestDto.Name;
            entity.Description = requestDto.Description;
            entity.ModificatorId = requestDto.ModificatorId.Value;
            entity.UserId = requestDto.UserId.Value;
            
            await RestServiceHelper.AddEntity(DbContext, DbSet, entity);
            return Mapper.Map<RealmResponseDto>(entity);
        });
    }

    public async Task<RealmResponseDto> Update(long id, UpdateRealmRequestDto requestDto)
    {
        return await RestServiceHelper.Execute(async () =>
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.Name = requestDto.Name;
            entity.Description = requestDto.Description;
            entity.ModificatorId = requestDto.ModificatorId.Value;
            entity.UserId = requestDto.UserId.Value;
            
            await RestServiceHelper.UpdateEntity(DbContext, DbSet, entity);
            return Mapper.Map<RealmResponseDto>(entity);
        });
    }
}