using System.ComponentModel.DataAnnotations;
using Common.Constants;
using Common.Constants.Constraints;
using Common.Interfaces;

namespace DataTransferObjects.Rest.User;

public class UpdateUserRequestDto : RequestDto
{
    [MaxLength(UserConstraints.UsernameMaxLength, ErrorMessage = UserConstraintErrorMessages.UsernameMaxLength)]
    public string Username { get; set; }
    
    [EmailAddress]
    [MaxLength(UserConstraints.EmailMaxLength, ErrorMessage = UserConstraintErrorMessages.EmailMaxLength)]
    public string? Email { get; set; }
}