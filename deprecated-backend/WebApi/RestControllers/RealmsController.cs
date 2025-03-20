using DataTransferObjects.Rest.Realm;
using Services.RestServices.Interfaces;

namespace WebApi.RestControllers;

public class RealmsController : RestController<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto>
{
    public RealmsController(IRestService<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto> service) : base(service)
    {
    }
}