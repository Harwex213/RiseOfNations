using AutoMapper;
using DataAccess.Entities;
using DataTransferObjects.Rpc.Authentication;

namespace Services.RpcServices.AutomapperProfiles;

public class UserMapperProfile : Profile
{
    public UserMapperProfile()
    {
        CreateMap<RegisterDto, UserEntity>();
        CreateMap<UserEntity, DescribeUserResponseDto>();
    }
}