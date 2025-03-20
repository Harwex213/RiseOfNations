using AutoMapper;
using Common.Constants;
using Common.Constants.ErrorMessages;
using DataAccess;
using DataAccess.Entities;
using DataTransferObjects.Rpc.Authentication;
using Microsoft.EntityFrameworkCore;
using Services.Exceptions;
using Services.InternalServices;
using Services.InternalServices.Interfaces;
using Services.RpcServices.Interfaces;

namespace Services.RpcServices;

public class AuthService : IAuthService
{
    public AuthService(AppDbContext dbContext, IPasswordHasher passwordHasher, IMapper mapper)
    {
        DbContext = dbContext;
        PasswordHasher = passwordHasher;
        Mapper = mapper;
    }

    public AppDbContext DbContext { get; set; }
    public IPasswordHasher PasswordHasher { get; set; }
    public IMapper Mapper { get; set; }

    public async Task<DescribeUserResponseDto> Register(RegisterDto registerDto)
    {
        return await ServiceHelper.Execute(async () =>
        {
            if (registerDto.Password != registerDto.RepeatPassword)
            {
                throw new BadRequestException(AuthenticationErrorMessages.InvalidRegistrationData);
            }

            var entity = Mapper.Map<UserEntity>(registerDto);
            entity.UserRole = UserRoles.Player;
            entity.Password = PasswordHasher.HashPassword(registerDto.Password);

            await ServiceHelper.AddEntity(DbContext, DbContext.UserEntities, entity);
            return Mapper.Map<DescribeUserResponseDto>(entity);
        });
    }

    public async Task<DescribeUserResponseDto> Login(LoginDto loginDto)
    {
        var user = await DbContext.UserEntities.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
        if (user == null)
        {
            throw new NotAuthorizedException(AuthenticationErrorMessages.BadCredentials);
        }
        if (PasswordHasher.VerifyPassword(loginDto.Password, user.Password) == false)
        {
            throw new NotAuthorizedException(AuthenticationErrorMessages.BadCredentials);
        }

        return Mapper.Map<DescribeUserResponseDto>(user);
    }

    public async Task<DescribeUserResponseDto> Login(LoginDto loginDto, string targetRole)
    {
        var user = await DbContext.UserEntities.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
        if (user == null)
        {
            throw new NotAuthorizedException(AuthenticationErrorMessages.BadCredentials);
        }
        if (PasswordHasher.VerifyPassword(loginDto.Password, user.Password) == false)
        {
            throw new NotAuthorizedException();
        }
        if (user.UserRole != targetRole)
        {
            throw new NotAuthorizedException(AuthenticationErrorMessages.BadCredentials);
        }

        return Mapper.Map<DescribeUserResponseDto>(user);
    }
}