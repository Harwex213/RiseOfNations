using DataTransferObjects.Rest.GameParty;
using DataTransferObjects.Rest.GameVariable;
using Services.RestServices.Interfaces;

namespace WebApi.RestControllers;

public class GamePartiesController : RestController<CreateGamePartyRequestDto, UpdateGamePartyRequestDto, GamePartyResponseDto>
{
    public GamePartiesController(IRestService<CreateGamePartyRequestDto, UpdateGamePartyRequestDto, GamePartyResponseDto> service) : base(service)
    {
    }
}