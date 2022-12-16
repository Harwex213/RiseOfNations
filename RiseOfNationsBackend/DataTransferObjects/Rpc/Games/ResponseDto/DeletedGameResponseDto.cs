using Common.Constants;

namespace DataTransferObjects.Rpc.Games.ResponseDto;

public class DeletedGameResponseDto
{
    public Guid Id { get; set; }
    public GameStatus Status { get; set; }
}