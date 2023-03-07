using Newtonsoft.Json.Linq;

namespace WebApi.Dtos.Games;

public class EndTurnRequest
{
    public JArray Actions { get; set; }
}