using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;

namespace DataTransferObjects.Rpc.Authentication;

public class RegisterDto
{
    [MaxLength(UserConstraints.UsernameMaxLength, ErrorMessage = UserConstraintErrorMessages.UsernameMaxLength)]
    public string Username { get; set; }
    
    [MaxLength(UserConstraints.PasswordMaxLength, ErrorMessage = UserConstraintErrorMessages.PasswordMaxLength)]
    public string Password { get; set; }
    
    [MaxLength(UserConstraints.PasswordMaxLength, ErrorMessage = UserConstraintErrorMessages.PasswordMaxLength)]
    public string RepeatPassword { get; set; }
    
    [EmailAddress]
    [MaxLength(UserConstraints.EmailMaxLength, ErrorMessage = UserConstraintErrorMessages.EmailMaxLength)]
    public string? Email { get; set; }
}