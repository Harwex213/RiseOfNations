using AutoMapper;
using Common.Constants;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.User;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class UserService : BaseRestService<UserResponseDto, UserEntity>, 
    IRestService<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto>
{
    public UserService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<UserEntity> filterService) 
        : base(dbContext, mapper, filterService)
    {
    }

    public async Task<UserResponseDto> Add(CreateUserRequestDto requestDto)
    {
        return await RestServiceHelper.Execute(async () =>
        {
            var entity = Mapper.Map<UserEntity>(requestDto);
            
            entity.UserRole = UserRoles.Player;
            
            await RestServiceHelper.AddEntity(DbContext, DbSet, entity);
            return Mapper.Map<UserResponseDto>(entity);
        });
    }

    public async Task<UserResponseDto> Update(long id, UpdateUserRequestDto requestDto)
    {
        return await RestServiceHelper.Execute(async () =>
        {
            var entity = await UndeletedEntities.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.Email = requestDto.Email;
            entity.Username = requestDto.Username;
            
            await RestServiceHelper.UpdateEntity(DbContext, DbSet, entity);
            return Mapper.Map<UserResponseDto>(entity);
        });
    }
}