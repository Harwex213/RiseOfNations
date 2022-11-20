using AutoMapper;
using Common.Constants;
using DataAccess;
using DataAccess.Constants;
using DataAccess.Entities;
using DataTransferObjects.Rest.User;
using EntityFramework.Exceptions.Common;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Services.Exceptions;
using Services.FilterServices.Interfaces;

namespace Services.RestServices;

// [GenerateRestController("users")]
public class UserService : RestService<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto, UserEntity>
{
    public UserService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<UserEntity> filterService) 
        : base(dbContext, mapper, filterService)
    {
    }

    public override Task<UserResponseDto> Add(CreateUserRequestDto requestDto)
    {
        requestDto.UserRole = UserRoles.Player;
        return base.Add(requestDto);
    }

    public override async Task<UserResponseDto> Update(long id, UpdateUserRequestDto requestDto)
    {
        try
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.Email = requestDto.Email;
            entity.Username = requestDto.Username;
            entity.IsDeleted = false;
            entity.Updated = DateTime.UtcNow;

            DbSet.Update(entity);
            await DbContext.SaveChangesAsync();
            
            return Mapper.Map<UserResponseDto>(entity);
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
}