using AutoMapper;
using DataAccess.Entities;
using DataTransferObjects.Rest.Modificator;

namespace Services.RestServices.AutomapperProfiles;

public class ModificatorMapperProfile : Profile
{
    public ModificatorMapperProfile()
    {
        CreateMap<CreateModificatorRequestDto, ModificatorEntity>();
        CreateMap<UpdateModificatorRequestDto, ModificatorEntity>();
        CreateMap<ModificatorEntity, ModificatorResponseDto>();
    }
}