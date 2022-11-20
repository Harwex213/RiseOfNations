using System.ComponentModel.DataAnnotations;
using Common.Constants;
using Common.Constants.Constraints;
using Common.Interfaces;

namespace DataTransferObjects.Rest.User;

public class CreateUserRequestDto : RequestDto
{
    [MaxLength(UserConstraints.UsernameMaxLength, ErrorMessage = UserConstraintErrorMessages.UsernameMaxLength)]
    public string Username { get; set; }
    
    [MaxLength(UserConstraints.PasswordMaxLength, ErrorMessage = UserConstraintErrorMessages.PasswordMaxLength)]
    public string Password { get; set; }
    
    [MaxLength(UserConstraints.EmailMaxLength, ErrorMessage = UserConstraintErrorMessages.EmailMaxLength)]
    public string? Email { get; set; }

    public UserRoles UserRole { get; set; }
}