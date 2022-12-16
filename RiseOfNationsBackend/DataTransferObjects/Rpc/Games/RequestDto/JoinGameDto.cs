namespace DataTransferObjects.Rpc.Games.RequestDto;

public class JoinGameDto
{
    public Guid GameId { get; set; }
    public PlayerDto JoiningPlayer { get; set; } = null!;
}