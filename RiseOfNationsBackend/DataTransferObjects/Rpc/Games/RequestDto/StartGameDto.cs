namespace DataTransferObjects.Rpc.Games.RequestDto;

public class StartGameDto
{
    public Guid GameId { get; set; }
    public long AttemptingUserId { get; set; }
}