using Common;
using Common.Constants;
using Common.Interfaces;

namespace DataTransferObjects.Rest.User;

public class UserResponseDto : ResponseDto
{
    public string Username { get; set; }
    public string Email { get; set; } = string.Empty;
    public UserRoles UserRole { get; set; }
}