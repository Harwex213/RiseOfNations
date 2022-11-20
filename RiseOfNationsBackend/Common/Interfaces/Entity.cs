using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Interfaces;

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
}