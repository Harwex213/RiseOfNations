using DataTransferObjects.Rest.User;
using Services.RestServices.Interfaces;

namespace WebApi.RestControllers;

public class UsersController : RestController<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto>
{
    public UsersController(IRestService<CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto> service) : base(service)
    {
    }
}