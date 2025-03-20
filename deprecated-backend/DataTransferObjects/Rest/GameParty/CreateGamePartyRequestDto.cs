using Common.Interfaces;

namespace DataTransferObjects.Rest.GameParty;

public class CreateGamePartyRequestDto : RequestDto
{
    public string Name { get; set; }
    public long WinnerUserId { get; set; }
    public int TurnsCompleted { get; set; }
    public short TurnDuration { get; set; }
}