using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;

namespace WebApi.Dtos.Games;

public class CreateGameRequest
{
    [MaxLength(GameConstraints.NameMaxLength, ErrorMessage = GameConstraintsErrorMessages.NameMaxLength)]
    public string Name { get; set; } = null!;
    public short PlayersAmount { get; set; }
    public short TurnDuration { get; set; }
}