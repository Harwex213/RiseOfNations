namespace WebApi.Dtos.Games;

public class SendMessageToChatResponse
{
    public long AuthorId { get; set; }
    public string AuthorUsername { get; set; } = null!;
    public short AuthorPlayerIndex { get; set; }
    public string Message { get; set; } = null!;
    public DateTime Time { get; set; }
}