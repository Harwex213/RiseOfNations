using DataTransferObjects.Rpc.Games;
using DataTransferObjects.Rpc.Games.RequestDto;
using DataTransferObjects.Rpc.Games.ResponseDto;

namespace Services.RpcServices.Interfaces;

public interface IGamesService
{
    public ICollection<GameResponseDto> GetJoinableGames();
    public GameResponseDto GetGame(Guid id);
    public GameResponseDto CreateGame(CreateGameDto createGameDto);
    public DeletedGameResponseDto DestroyGame(Guid id);
    public GameResponseDto JoinGame(JoinGameDto joinGameDto);
    public GameResponseDto LeaveGame(LeaveGameDto leaveGameDto);
    public GameResponseDto SelectRealm(SelectRealmDto selectRealmDto);
    public GameResponseDto KickPlayer(KickPlayerDto kickPlayerDto);
    public GameResponseDto SetPlayerIsReady(PlayerIsReadyDto playerIsReadyDto, bool value);
    public GameResponseDto StartGame(StartGameDto startGameDto);
}