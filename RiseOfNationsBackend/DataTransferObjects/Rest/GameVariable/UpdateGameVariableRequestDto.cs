using Common.Interfaces;

namespace DataTransferObjects.Rest.GameVariable;

public class UpdateGameVariableRequestDto : RequestDto
{
    public short DefaultValue { get; set; }
}