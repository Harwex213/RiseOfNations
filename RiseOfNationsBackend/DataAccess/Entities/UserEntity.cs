using System.ComponentModel.DataAnnotations;
using Common.Constants;
using Common.Constants.Constraints;
using DataAccess.Constants;
using DataAccess.Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

public class UserEntity : Entity
{
    public UserEntity()
    {
        Realms  = new HashSet<RealmEntity>();
        GameParties  = new HashSet<GamePartyEntity>();
    }
    
    [MaxLength(UserConstraints.UsernameMaxLength)]
    public string Username { get; set; }
    
    [MaxLength(UserConstraints.HashedPasswordMaxLength)]
    public string Password { get; set; }
    
    [MaxLength(UserConstraints.EmailMaxLength)]
    public string? Email { get; set; }
    
    [MaxLength(UserConstraints.UserRoleMaxLength)]
    public string UserRole { get; set; }
    
    public virtual ICollection<RealmEntity> Realms { get; set; }
    public virtual ICollection<GamePartyEntity> GameParties { get; set; }
    
    public override void CascadeDelete()
    {
        foreach (var realmEntity in Realms)
        {
            realmEntity.Delete();
            realmEntity.CascadeDelete();
        }
        foreach (var gamePartyEntity in GameParties)
        {
            gamePartyEntity.Delete();
            gamePartyEntity.CascadeDelete();
        }
    }
}