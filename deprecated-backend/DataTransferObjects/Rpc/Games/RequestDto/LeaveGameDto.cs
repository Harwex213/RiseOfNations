namespace DataTransferObjects.Rpc.Games.RequestDto;

public class LeaveGameDto
{
    public Guid GameId { get; set; }
    public long UserId { get; set; }
}