namespace DataTransferObjects.Rpc.Games.RequestDto;

public class SelectRealmDto
{
    public Guid GameId { get; set; }
    public long UserId { get; set; }
    public long RealmId { get; set; }
}