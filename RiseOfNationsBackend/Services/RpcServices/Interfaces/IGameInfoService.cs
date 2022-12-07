using DataTransferObjects.Rpc.GameInfo;

namespace Services.RpcServices.Interfaces;

public interface IGameInfoService
{
    public Task<GameInfoResponseDto> GetGameInfo();
}