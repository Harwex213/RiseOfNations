using AutoMapper;
using Common.Interfaces;
using DataAccess;
using DataAccess.Constants;
using DataAccess.Utils;
using DataTransferObjects.Rest;
using EntityFramework.Exceptions.Common;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Services.Exceptions;
using Services.RestServices.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Services.FilterServices.Interfaces;

namespace Services.RestServices;

public abstract class RestService<TRequestCreateDto, TRequestUpdateDto, TResponseDto, TEntity> : IRestService<TRequestCreateDto, TRequestUpdateDto, TResponseDto>
    where TRequestCreateDto : RequestDto 
    where TRequestUpdateDto : RequestDto
    where TResponseDto : ResponseDto
    where TEntity : Entity
{
    public RestService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<TEntity> filterService)
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
    protected IQueryable<TEntity> UndeletedEntities => DbSet.Where(e => e.IsDeleted == false);

    protected class DefaultEntityFilterDto
    {
        public long? Id { get; set; }
        public long[]? Ids { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public virtual async Task<(IEnumerable<TResponseDto>, int count)> GetAll(GetAllDto getAllDto)
    {
        static IQueryable<TEntity> FilterDefaultEntityProps(IQueryable<TEntity> entities, DefaultEntityFilterDto defaultEntityFilterDto)
        {
            if (defaultEntityFilterDto.Id != null)
            {
                entities = entities.Where(e => e.Id == defaultEntityFilterDto.Id);
            }
            if (defaultEntityFilterDto.Ids != null)
            {
                entities = entities.Where(e => defaultEntityFilterDto.Ids.Contains(e.Id));
            }
            if (defaultEntityFilterDto.Created != null)
            {
                entities = entities.Where(e => e.Created == defaultEntityFilterDto.Created);
            }
            if (defaultEntityFilterDto.Updated != null)
            {
                entities = entities.Where(e => e.Updated == defaultEntityFilterDto.Updated);
            }
            if (defaultEntityFilterDto.IsDeleted != null)
            {
                entities = entities.Where(e => e.IsDeleted == defaultEntityFilterDto.IsDeleted);
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
        
        var entities = UndeletedEntities;

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
        var currentEntitiesCount = await UndeletedEntities.CountAsync();
        return (response, currentEntitiesCount);
    }
    
    public virtual async Task<TResponseDto> Get(long id)
    {
        return Mapper.Map<TResponseDto>(await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id));
    }

    public virtual async Task<TResponseDto> Add(TRequestCreateDto requestDto)
    {
        try
        {
            var entity = Mapper.Map<TEntity>(requestDto);
            entity.IsDeleted = false;
            entity.Created = DateTime.UtcNow;
            entity.Updated = DateTime.UtcNow;

            await DbSet.AddAsync(entity);
            await DbContext.SaveChangesAsync();

            return Mapper.Map<TResponseDto>(entity);
        }
        catch (UniqueConstraintException e)
        {
            if (e.InnerException is PostgresException postgresException)
            {
                var errorMessage = EntitiesConstraintNames.MapConstraintNameToError(postgresException.ConstraintName);
                throw new BadRequestException(errorMessage);
            }
            
            throw new BadRequestException();
        }
        catch (DbUpdateException e) when (e is CannotInsertNullException
                                              or MaxLengthExceededException
                                              or NumericOverflowException
                                              or ReferenceConstraintException)
        {
            throw new BadRequestException();
        }
    }

    public virtual async Task<TResponseDto> Update(long id, TRequestUpdateDto requestDto)
    {
        try
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }
            
            var entityUpdate = Mapper.Map<TEntity>(requestDto);
            entityUpdate.Id = entity.Id;
            entityUpdate.IsDeleted = false;
            entityUpdate.Created = entity.Created;
            entityUpdate.Updated = DateTime.UtcNow;

            DbSet.Local.Remove(entity);
            DbSet.Update(entityUpdate);
            await DbContext.SaveChangesAsync();
            
            return Mapper.Map<TResponseDto>(entity);
        }
        catch (UniqueConstraintException e)
        {
            if (e.InnerException is PostgresException postgresException)
            {
                var errorMessage = EntitiesConstraintNames.MapConstraintNameToError(postgresException.ConstraintName);
                throw new BadRequestException(errorMessage);
            }
            
            throw new BadRequestException();
        }
        catch (DbUpdateException e) when (e is CannotInsertNullException
                                              or MaxLengthExceededException
                                              or NumericOverflowException
                                              or ReferenceConstraintException)
        {
            throw new BadRequestException();
        }
    }

    public virtual async Task<TResponseDto> Delete(long id)
    {
        try
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.IsDeleted = true;
            entity.Updated = DateTime.UtcNow;
        
            DbSet.Update(entity);
            await DbContext.SaveChangesAsync();
            
            return Mapper.Map<TResponseDto>(entity);
        }
        catch (DbUpdateException e) when (e is UniqueConstraintException
                                              or CannotInsertNullException
                                              or MaxLengthExceededException
                                              or NumericOverflowException
                                              or ReferenceConstraintException)
        {
            throw new BadRequestException();
        }
    }
}