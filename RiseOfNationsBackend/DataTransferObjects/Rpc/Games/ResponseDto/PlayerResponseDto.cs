namespace DataTransferObjects.Rpc.Games.ResponseDto;

public class PlayerResponseDto
{
    public long Id { get; set; }
    public string Username { get; set; }
    public bool IsOwner { get; set; }
    public bool IsReady { get; set; }
    public long? SelectedRealmId { get; set; }
}