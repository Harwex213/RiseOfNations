using AutoMapper;
using DataAccess.Entities;
using DataTransferObjects.Rest.User;

namespace Services.RestServices.AutomapperProfiles;

public class UserMapperProfile : Profile
{
    public UserMapperProfile()
    {
        CreateMap<CreateUserRequestDto, UserEntity>();
        CreateMap<UpdateUserRequestDto, UserEntity>();
        CreateMap<UserEntity, UserResponseDto>();
    }
}