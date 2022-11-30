using AutoMapper;
using DataAccess.Entities;
using DataTransferObjects.Rest.Realm;

namespace Services.RestServices.AutomapperProfiles;

public class RealmMapperProfile : Profile
{
    public RealmMapperProfile()
    {
        CreateMap<CreateRealmRequestDto, RealmEntity>();
        CreateMap<UpdateRealmRequestDto, RealmEntity>();
        CreateMap<RealmEntity, RealmResponseDto>();
    }
}