using Common.Interfaces;

namespace DataTransferObjects.Rest.Modificator;

public class ModificatorResponseDto : ResponseDto
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public long AffectedGameVariableId { get; set; }
    
    public short ModificatorValue { get; set; }
}