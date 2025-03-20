using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;

namespace DataTransferObjects.Rpc.Games.RequestDto;

public class PlayerDto
{
    public long Id { get; set; }
    
    [MaxLength(UserConstraints.UsernameMaxLength, ErrorMessage = UserConstraintErrorMessages.UsernameMaxLength)]
    public string Username { get; set; } = null!;
}