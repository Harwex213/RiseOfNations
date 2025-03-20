namespace DataTransferObjects.Rpc.Games.RequestDto;

public class PlayerIsReadyDto
{
    public Guid GameId { get; set; }
    public long UserId { get; set; }
}