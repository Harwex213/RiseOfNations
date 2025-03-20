using Newtonsoft.Json.Linq;

namespace WebApi.Dtos.Games;

public class EndTurnResponse
{
    public JArray Actions { get; set; }
    public long UserId { get; set; }
}