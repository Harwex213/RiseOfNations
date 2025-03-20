using AutoMapper;
using Common.Constants;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rest.User;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.FilterServices.Interfaces;
using Services.InternalServices;
using Services.InternalServices.Interfaces;
using Services.RestServices.Base;
using Services.RestServices.Interfaces;

namespace Services.RestServices;

public class UserService : BaseRestService<UserResponseDto, UserEntity>, 
    IRestService<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto>
{
    public UserService(AppDbContext dbContext, IMapper mapper, IEntityFilterService<UserEntity> filterService, IPasswordHasher passwordHasher) 
        : base(dbContext, mapper, filterService)
    {
        PasswordHasher = passwordHasher;
    }
    
    public IPasswordHasher PasswordHasher { get; set; }

    protected override IQueryable<UserEntity> QueryableDbSet => DbSet.Where(e => e.UserRole == UserRoles.Player);

    public async Task<UserResponseDto> Add(CreateUserRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = Mapper.Map<UserEntity>(requestDto);
            
            entity.UserRole = UserRoles.Player;
            entity.Password = PasswordHasher.HashPassword(requestDto.Password);
            
            await ServiceHelper.AddEntity(DbContext, DbSet, entity);
            return Mapper.Map<UserResponseDto>(entity);
        });
    }

    public async Task<UserResponseDto> Update(long id, UpdateUserRequestDto requestDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            var entity = await QueryableDbSet.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
            {
                throw new NotFoundException();
            }

            entity.Email = requestDto.Email;
            entity.Username = requestDto.Username;
            
            await ServiceHelper.UpdateEntity(DbContext, DbSet, entity);
            return Mapper.Map<UserResponseDto>(entity);
        });
    }
}