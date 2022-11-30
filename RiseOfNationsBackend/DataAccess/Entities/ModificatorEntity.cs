using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Constants.Constraints;
using DataAccess.Constants;
using DataAccess.Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

[Index(nameof(Name), IsUnique = true, Name = EntitiesConstraintNames.ModificatorEntityName)]
public class ModificatorEntity : Entity
{
    public ModificatorEntity()
    {
        Realms = new HashSet<RealmEntity>();
    }
    
    [MaxLength(ModificatorConstraints.NameMaxLength)]
    public string Name { get; set; }
    
    [MaxLength(ModificatorConstraints.DescriptionMaxLength)]
    public string Description { get; set; }
    
    public long AffectedGameVariableId { get; set; }

    public short ModificatorValue { get; set; }
    
    [ForeignKey(nameof(AffectedGameVariableId))]
    public virtual GameVariableEntity AffectedGameVariable { get; set; }

    public virtual ICollection<RealmEntity> Realms { get; set; }
    
    public override void CascadeDelete()
    {
        foreach (var realmEntity in Realms)
        {
            realmEntity.Delete();
            realmEntity.CascadeDelete();
        }
    }
}