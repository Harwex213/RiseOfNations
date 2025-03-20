using Common.Interfaces;

namespace DataTransferObjects.Rest.GameVariable;

public class GameVariableResponseDto : ResponseDto
{
    public string Name { get; set; }
    
    public short DefaultValue { get; set; }
}