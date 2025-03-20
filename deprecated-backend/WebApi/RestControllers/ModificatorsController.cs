using DataTransferObjects.Rest.Modificator;
using Services.RestServices.Interfaces;

namespace WebApi.RestControllers;

public class ModificatorsController : RestController<CreateModificatorRequestDto, UpdateModificatorRequestDto, ModificatorResponseDto>
{
    public ModificatorsController(IRestService<CreateModificatorRequestDto, UpdateModificatorRequestDto, ModificatorResponseDto> service) : base(service)
    {
    }
}