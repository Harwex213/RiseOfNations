namespace WebApi.Dtos.Games;

public class SendMessageToChatRequest
{
    public Guid GameId { get; set; }
    public string Message { get; set; }
}