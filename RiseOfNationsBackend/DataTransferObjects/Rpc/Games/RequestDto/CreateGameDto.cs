using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;

namespace DataTransferObjects.Rpc.Games.RequestDto;

public class CreateGameDto
{
    [MaxLength(GameConstraints.NameMaxLength, ErrorMessage = GameConstraintsErrorMessages.NameMaxLength)]
    public string Name { get; set; } = null!;
    public short PlayersAmount { get; set; }
    public short TurnDuration { get; set; }
    public PlayerDto CreatingPlayer { get; set; } = new();
}