namespace DataTransferObjects.Rpc.Games.RequestDto;

public class KickPlayerDto
{
    public Guid GameId { get; set; }
    public long KickedUserId { get; set; }
    public long KickingUserId { get; set; }
}