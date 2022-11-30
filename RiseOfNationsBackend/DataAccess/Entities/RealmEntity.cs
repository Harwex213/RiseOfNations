using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Constants.Constraints;
using DataAccess.Constants;
using DataAccess.Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

[Index(nameof(Name), IsUnique = true, Name = EntitiesConstraintNames.RealmEntityName)]
public class RealmEntity : Entity
{
    [MaxLength(RealmConstraints.NameMaxLength)]
    public string Name { get; set; }
    
    [MaxLength(RealmConstraints.DescriptionMaxLength)]
    public string? Description { get; set; }
    
    public long UserId { get; set; }
    
    public long ModificatorId { get; set; }
    
    [ForeignKey(nameof(UserId))]
    public virtual UserEntity User { get; set; }
    
    [ForeignKey(nameof(ModificatorId))]
    public virtual ModificatorEntity Modificator { get; set; }

    public override void CascadeDelete() { }
}