using DataTransferObjects.Rest.GameVariable;
using DataTransferObjects.Rest.Modificator;

namespace DataTransferObjects.Rpc.GameInfo;

public class GameInfoResponseDto
{
    public ICollection<GameVariableResponseDto> GameVariables { get; set; }
    public ICollection<ModificatorResponseDto> Modificators { get; set; }
}