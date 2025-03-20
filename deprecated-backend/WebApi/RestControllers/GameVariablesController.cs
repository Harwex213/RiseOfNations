using DataTransferObjects.Rest.GameVariable;
using Services.RestServices.Interfaces;

namespace WebApi.RestControllers;

public class GameVariablesController : RestController<CreateGameVariableRequestDto, UpdateGameVariableRequestDto, GameVariableResponseDto>
{
    public GameVariablesController(IRestService<CreateGameVariableRequestDto, UpdateGameVariableRequestDto, GameVariableResponseDto> service) : base(service)
    {
    }
}