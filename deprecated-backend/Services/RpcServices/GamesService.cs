using System.Collections.Concurrent;
using AutoMapper;
using Common.Constants;
using Common.Constants.ErrorMessages;
using DataTransferObjects.Rpc.Games.RequestDto;
using DataTransferObjects.Rpc.Games.ResponseDto;
using Services.Exceptions;
using Services.RpcServices.GameServiceEntities;
using Services.RpcServices.Interfaces;

namespace Services.RpcServices;

public class GamesService : IGamesService
{
    public GamesService(IMapper mapper)
    {
        Mapper = mapper;
    }

    private IMapper Mapper { get; }
    private static readonly ConcurrentDictionary<Guid, Game> Games = new();

    public ICollection<GameResponseDto> GetJoinableGames()
    {
        var joinableGames = Games.Where(g => g.Value.Status == GameStatus.Preparing)
            .Select(g => g.Value).OrderByDescending(g => g.Created).ToList();
        return Mapper.Map<ICollection<GameResponseDto>>(joinableGames);
    }

    public GameResponseDto GetGame(Guid id)
    {
        if (Games.TryGetValue(id, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto CreateGame(CreateGameDto createGameDto)
    {
        var game = Mapper.Map<Game>(createGameDto);
        game.Id = Guid.NewGuid();
        game.PlayerOwnerId = createGameDto.CreatingPlayer.Id;
        game.Status = GameStatus.Preparing;

        var gameOwnerPlayer = Mapper.Map<Player>(createGameDto.CreatingPlayer);
        gameOwnerPlayer.IsOwner = true;
        game.Players.Add(gameOwnerPlayer);
        
        if (Games.TryAdd(game.Id, game) == false)
        {
            throw new BadRequestException(GamesErrorMessages.CannotCreateGame);
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }
    
    public DeletedGameResponseDto DestroyGame(Guid id)
    {
        if (Games.TryRemove(id, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }
        
        var gameResponseDto = Mapper.Map<DeletedGameResponseDto>(game);
        return gameResponseDto;
    }

    public GameResponseDto JoinGame(JoinGameDto joinGameDto)
    {
        var player = Mapper.Map<Player>(joinGameDto.JoiningPlayer);

        if (Games.TryGetValue(joinGameDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            if (game.Status != GameStatus.Preparing)
            {
                throw new BadRequestException(GamesErrorMessages.GameIsNotPreparing);
            }
            
            if (game.Players.Count == game.PlayersAmount)
            {
                throw new BadRequestException(GamesErrorMessages.GameIsFull);
            }

            if (game.Players.FirstOrDefault(p => p.Id == player.Id) != null)
            {
                throw new BadRequestException(GamesErrorMessages.PlayerAlreadyJoined);
            }
            
            game.Players.Add(player);
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto LeaveGame(LeaveGameDto leaveGameDto)
    {
        if (Games.TryGetValue(leaveGameDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            var playerToDelete = game.Players.FirstOrDefault(p => p.Id == leaveGameDto.UserId);
            if (playerToDelete == null)
            {
                throw new NotFoundException(GamesErrorMessages.PlayerNotFound);
            }

            game.Players.Remove(playerToDelete);
            if (playerToDelete.IsOwner && game.Players.Count != 0)
            {
                game.Players[0].IsOwner = true;
                game.PlayerOwnerId = game.Players[0].Id;
            }
        }
            
        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto SelectRealm(SelectRealmDto selectRealmDto)
    {
        if (Games.TryGetValue(selectRealmDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            var player = game.Players.FirstOrDefault(p => p.Id == selectRealmDto.UserId);
            if (player == null)
            {
                throw new NotFoundException(GamesErrorMessages.PlayerNotFound);
            }

            player.SelectedRealmId = selectRealmDto.RealmId;
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto KickPlayer(KickPlayerDto kickPlayerDto)
    {
        if (Games.TryGetValue(kickPlayerDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            if (game.Status != GameStatus.Preparing)
            {
                throw new BadRequestException(GamesErrorMessages.GameIsNotPreparing);
            }

            if (game.PlayerOwnerId != kickPlayerDto.KickingUserId)
            {
                throw new BadRequestException(GamesErrorMessages.CannotKick);
            }
            var playerToKick = game.Players.FirstOrDefault(p => p.Id == kickPlayerDto.KickedUserId);
            if (playerToKick == null)
            {
                throw new NotFoundException(GamesErrorMessages.PlayerNotFound);
            }

            game.Players.Remove(playerToKick);
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto SetPlayerIsReady(PlayerIsReadyDto playerIsReadyDto, bool value)
    {
        if (Games.TryGetValue(playerIsReadyDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            var player = game.Players.FirstOrDefault(p => p.Id == playerIsReadyDto.UserId);
            if (player == null)
            {
                throw new NotFoundException(GamesErrorMessages.PlayerNotFound);
            }

            if (player.SelectedRealmId == null)
            {
                throw new BadRequestException(GamesErrorMessages.ShouldSelectRealm);
            }
            
            player.IsReady = value;
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto StartGame(StartGameDto startGameDto)
    {
        if (Games.TryGetValue(startGameDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            if (game.PlayerOwnerId != startGameDto.AttemptingUserId)
            {
                throw new BadRequestException(GamesErrorMessages.CannotStart);
            }
            
            if (game.Status != GameStatus.Preparing)
            {
                throw new BadRequestException(GamesErrorMessages.GameIsNotPreparing);
            }

            if (game.Players.Count < 2)
            {
                throw new BadRequestException(GamesErrorMessages.NotEnoughPlayers);
            }

            if (game.Players.Skip(1).All(p => p.IsReady) == false)
            {
                throw new BadRequestException(GamesErrorMessages.PlayersNotReady);
            }

            game.Status = GameStatus.Started;
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }

    public GameResponseDto FinishGame(FinishGameDto finishGameDto)
    {
        if (Games.TryGetValue(finishGameDto.GameId, out var game) == false)
        {
            throw new NotFoundException(GamesErrorMessages.GameNotFound);
        }

        lock (game)
        {
            if (game.Status != GameStatus.Started)
            {
                throw new BadRequestException(GamesErrorMessages.GameIsNotStarted);
            }
            if (game.Players.Exists(p => p.Id == finishGameDto.WinnerPlayerId) == false)
            {
                throw new NotFoundException(GamesErrorMessages.PlayerNotFound);
            }

            game.Status = GameStatus.Finished;
            game.PlayerWinnerIndex = finishGameDto.WinnerPlayerIndex;
        }
        
        return Mapper.Map<GameResponseDto>(game);
    }
}