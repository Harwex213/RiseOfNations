using DataAccess.Entities;

namespace Services.RpcServices.GameServiceEntities;

public class Player
{
    public long Id { get; set; }
    public string Username { get; set; } = null!;
    public bool IsOwner { get; set; }
    public bool IsReady { get; set; }
    public long? SelectedRealmId { get; set; }
}