using System.ComponentModel.DataAnnotations;
using Common.Constants.Constraints;
using Common.Interfaces;

namespace DataTransferObjects.Rest.Modificator;

public class CreateModificatorRequestDto : RequestDto
{
    [MaxLength(ModificatorConstraints.NameMaxLength, ErrorMessage = ModificatorConstraintsErrorMessages.NameMaxLength)]
    public string Name { get; set; }
    
    [MaxLength(ModificatorConstraints.DescriptionMaxLength, ErrorMessage = ModificatorConstraintsErrorMessages.DescriptionMaxLength)]
    public string Description { get; set; }
    
    public long AffectedGameVariableId { get; set; }
    
    public short ModificatorValue { get; set; }
}