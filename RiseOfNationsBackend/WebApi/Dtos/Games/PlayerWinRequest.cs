using Newtonsoft.Json.Linq;

namespace WebApi.Dtos.Games;

public class PlayerWinRequest
{
    public JArray Actions { get; set; }
    public long WinnerPlayerIndex { get; set; }
    public int TurnsCompleted { get; set; }
}