using System.ComponentModel.DataAnnotations.Schema;
using DataAccess.Entities.Interfaces;

namespace DataAccess.Entities;

public class GamePartyEntity : Entity
{
    public string Name { get; set; }
    public long WinnerUserId { get; set; }
    public int TurnsCompleted { get; set; }
    public short TurnDuration { get; set; }
    
    [ForeignKey(nameof(WinnerUserId))]
    public virtual UserEntity WinnerUser { get; set; }
    
    public override void CascadeDelete()
    {
    }
}