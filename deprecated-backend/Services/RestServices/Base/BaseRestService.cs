﻿using AutoMapper;
using Common.Interfaces;
using DataAccess;
using DataAccess.Entities.Interfaces;
using DataAccess.Utils;
using DataTransferObjects.Rest;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.InternalServices;

namespace Services.RestServices.Base;

public abstract class BaseRestService<TResponseDto, TEntity>
    where TResponseDto : ResponseDto
    where TEntity : Entity
{
    public BaseRestService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<TEntity> filterService)
    {
        DbContext = dbContext;
        Mapper = mapper;
        FilterService = filterService;
        DbSet = dbContext.Set<TEntity>();
    }

    protected AppDbContext DbContext { get; }
    protected IMapper Mapper { get; }
    protected IEntityFilterService<TEntity> FilterService { get; }
    protected DbSet<TEntity> DbSet { get; }
    protected virtual IQueryable<TEntity> QueryableDbSet => DbSet.AsQueryable();

    protected class DefaultEntityFilterDto
    {
        public object? Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
    }

    public virtual async Task<(IEnumerable<TResponseDto>, int count)> GetAll(GetAllDto getAllDto)
    {
        static IQueryable<TEntity> FilterDefaultEntityProps(IQueryable<TEntity> entities, DefaultEntityFilterDto defaultEntityFilterDto)
        {
            if (defaultEntityFilterDto.Id is long id)
            {
                entities = entities.Where(e => e.Id == id);
            }
            if (defaultEntityFilterDto.Id is JArray array)
            {
                var ids = array.ToObject<long[]>();
                if (ids != null)
                {
                    entities = entities.Where(e => ids.Contains(e.Id));
                }
            }
            if (defaultEntityFilterDto.Created != null)
            {
                entities = entities.Where(e => e.Created == defaultEntityFilterDto.Created);
            }
            if (defaultEntityFilterDto.Updated != null)
            {
                entities = entities.Where(e => e.Updated == defaultEntityFilterDto.Updated);
            }

            return entities;
        }
        
        IQueryable<TEntity> FilterEntityProps(IQueryable<TEntity> entities, string filterParam)
        {
            var filter = JsonConvert.DeserializeObject<JObject>(filterParam);
            if (filter == null)
            {
                return entities;
            }
        
            var defaultEntityFilterDto = filter.ToObject<DefaultEntityFilterDto>();
            if (defaultEntityFilterDto != null)
            {
                entities = FilterDefaultEntityProps(entities, defaultEntityFilterDto);
            }

            return FilterService.FilterByJObject(entities, filter);
        }
        
        var entities = QueryableDbSet;

        if (string.IsNullOrEmpty(getAllDto.Filter) == false)
        {
            entities = FilterEntityProps(entities, getAllDto.Filter);
        }
        if (getAllDto.Sort.HasValue)
        {
            var (property, order) = getAllDto.Sort.Value;
            entities = entities.OrderByDynamically(property, order);
        }
        if (getAllDto.Range.HasValue)
        {
            var toSkip = getAllDto.Range.Value.from;
            var toTake = getAllDto.Range.Value.to - getAllDto.Range.Value.from + 1;
            entities = entities.Skip(toSkip).Take(toTake);
        }

        var response = Mapper.Map<List<TResponseDto>>(await entities.ToListAsync());
        var currentEntitiesCount = await QueryableDbSet.CountAsync();
        return (response, currentEntitiesCount);
    }
    
    public virtual async Task<TResponseDto> Get(long id)
    {
        return Mapper.Map<TResponseDto>(await QueryableDbSet.FirstOrDefaultAsync(entity => entity.Id == id));
    }
    
    public virtual async Task<TResponseDto> Delete(long id)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = await QueryableDbSet.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            await ServiceHelper.DeleteEntity(DbContext, DbSet, entity);
            return Mapper.Map<TResponseDto>(entity);
        });
    }
}