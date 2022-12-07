using DataTransferObjects.Rest.Realm;

namespace Services.RpcServices.Interfaces;

public interface IRealmsService
{
    public Task<ICollection<RealmResponseDto>> GetUserRealms(long userId);
}