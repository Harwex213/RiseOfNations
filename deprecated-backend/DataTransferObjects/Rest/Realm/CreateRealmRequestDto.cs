using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;
using Common.Interfaces;

namespace DataTransferObjects.Rest.Realm;

public class CreateRealmRequestDto : RequestDto
{
    [Required(ErrorMessage = RealmConstraintsErrorMessages.NameRequired)]
    [MaxLength(RealmConstraints.NameMaxLength, ErrorMessage = RealmConstraintsErrorMessages.NameMaxLength)]
    public string Name { get; set; }
    
    [MaxLength(RealmConstraints.DescriptionMaxLength, ErrorMessage = RealmConstraintsErrorMessages.DescriptionMaxLength)]
    public string? Description { get; set; }
    
    [Required(ErrorMessage = RealmConstraintsErrorMessages.UserIdRequired)]
    public long? UserId { get; set; }
    
    [Required(ErrorMessage = RealmConstraintsErrorMessages.ModificatorIdRequired)]
    public long? ModificatorId { get; set; }

    public string? FlagBase64 { get; set; }
    public string? FlagFileName { get; set; }
}