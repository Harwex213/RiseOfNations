using Common.Constants;

namespace DataTransferObjects.Rpc.Games.ResponseDto;

public class GameResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public short PlayersAmount { get; set; }
    public short TurnDuration { get; set; }
    public long PlayerOwnerId { get; set; }
    public long PlayerWinnerIndex { get; set; }
    public GameStatus Status { get; set; }
    public List<PlayerResponseDto> Players { get; set; } = new();
}