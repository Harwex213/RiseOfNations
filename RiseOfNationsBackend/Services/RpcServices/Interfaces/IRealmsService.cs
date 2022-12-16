using DataTransferObjects.Rest.Realm;

namespace Services.RpcServices.Interfaces;

public interface IRealmsService
{
    public Task<RealmResponseDto> GetRealm(long id);
    public Task<RealmResponseDto> GetUserRealm(long userId, long id);
    public Task<ICollection<RealmResponseDto>> GetUserRealms(long userId);
}