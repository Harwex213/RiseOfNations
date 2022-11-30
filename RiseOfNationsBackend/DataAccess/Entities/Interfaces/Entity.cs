using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities.Interfaces;

public abstract class Entity
{
    [Key]
    [Required]
    public long Id { get; set; }
    
    [Required]
    public DateTime Created { get; set; }
    
    [Required]
    public DateTime Updated { get; set; }

    [Required]
    public bool IsDeleted { get; set; }

    public void Delete()
    {
        IsDeleted = true;
        Updated = DateTime.UtcNow;
    }

    public abstract void CascadeDelete();
}