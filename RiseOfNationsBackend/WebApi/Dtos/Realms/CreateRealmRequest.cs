using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;

namespace WebApi.Dtos.Realms;

public class CreateRealmRequest
{
    [Required(ErrorMessage = RealmConstraintsErrorMessages.NameRequired)]
    [MaxLength(RealmConstraints.NameMaxLength, ErrorMessage = RealmConstraintsErrorMessages.NameMaxLength)]
    public string Name { get; set; }
    
    [MaxLength(RealmConstraints.DescriptionMaxLength, ErrorMessage = RealmConstraintsErrorMessages.DescriptionMaxLength)]
    public string? Description { get; set; }
    
    [Required(ErrorMessage = RealmConstraintsErrorMessages.ModificatorIdRequired)]
    public long? ModificatorId { get; set; }

    public string? FlagBase64 { get; set; }
    public string? FlagFileName { get; set; }
}