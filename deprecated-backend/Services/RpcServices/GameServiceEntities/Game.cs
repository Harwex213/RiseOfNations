using Common.Constants;

namespace Services.RpcServices.GameServiceEntities;

public class Game
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public short PlayersAmount { get; set; }
    public short TurnDuration { get; set; }
    public long PlayerOwnerId { get; set; }
    public long PlayerWinnerIndex { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public GameStatus Status { get; set; }
    public List<Player> Players { get; set; } = new();
}