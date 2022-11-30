using Common.Interfaces;

namespace DataTransferObjects.Rest.Realm;

public class RealmResponseDto : ResponseDto
{    
    public string Name { get; set; }
    public string Description { get; set; }
    public long UserId { get; set; }
    public long ModificatorId { get; set; }
}