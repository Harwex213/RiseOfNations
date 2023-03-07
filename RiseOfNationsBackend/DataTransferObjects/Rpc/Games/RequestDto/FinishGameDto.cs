namespace DataTransferObjects.Rpc.Games.RequestDto;

public class FinishGameDto
{
    public Guid GameId { get; set; }
    public long WinnerPlayerId { get; set; }
    public long WinnerPlayerIndex { get; set; }
}