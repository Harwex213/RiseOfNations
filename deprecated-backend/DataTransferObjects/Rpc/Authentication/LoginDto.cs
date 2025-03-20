using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;

namespace DataTransferObjects.Rpc.Authentication;

public class LoginDto
{
    [MaxLength(UserConstraints.UsernameMaxLength, ErrorMessage = UserConstraintErrorMessages.UsernameMaxLength)]
    public string Username { get; set; }
    
    [MaxLength(UserConstraints.PasswordMaxLength, ErrorMessage = UserConstraintErrorMessages.PasswordMaxLength)]
    public string Password { get; set; }
}