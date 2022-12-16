using AutoMapper;
using Common.Constants;
using Common.Constants.ErrorMessages;
using DataTransferObjects.Rpc.Authentication;
using DataTransferObjects.Rpc.Games.RequestDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Exceptions;
using Services.RpcServices.Interfaces;
using WebApi.Constants;
using WebApi.Dtos.Games;
using WebApi.Extensions;
using WebApi.Filters;
using WebApi.Services;

namespace WebApi.RpcControllers;

[Route("api/[controller]")]
public class GameController : Controller
{
    public GameController(IGamesService gamesService, IGameSseService gameSseService, IGameListSseService gameListSseService, IMapper mapper, IRealmsService realmsService)
    {
        GamesService = gamesService;
        GameSseService = gameSseService;
        GameListSseService = gameListSseService;
        Mapper = mapper;
        RealmsService = realmsService;
    }

    public IGamesService GamesService { get; set; }
    public IRealmsService RealmsService { get; set; }
    public IGameSseService GameSseService { get; set; }
    public IGameListSseService GameListSseService { get; set; }
    public IMapper Mapper { get; set; }

    private async Task OnClientDisconnected(Guid gameId, long userId)
    {
        GameSseService.RemoveClient(gameId, HttpContext);

        var leavedGame = GamesService.LeaveGame(new LeaveGameDto
        {
            GameId = gameId,
            UserId = userId
        });
        if (leavedGame.Players.Count == 0)
        {
            var deletedGame = GamesService.DestroyGame(gameId);
            if (deletedGame.Status == GameStatus.Preparing)
            {
                await GameListSseService.SendEventAsync(new ServerSentEvent
                {
                    Name = GameListEvents.GameDeleted,
                    Data = deletedGame
                });
            }
            return;
        }
        
        var response = JsonConvert.SerializeObject(leavedGame);

        if (leavedGame.Status == GameStatus.Preparing)
        {
            await GameListSseService.SendEventAsync(new ServerSentEvent
            {
                Name = GameListEvents.GameUpdated,
                Data = response
            });
        }
        
        await GameSseService.SendEventAsync(gameId, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = response
        });
    }
    
    [HttpGet("create")]
    [Authorize]
    [ModelStateValidation]
    public async Task CreateGame(CreateGameRequest createGameRequest)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        var createGameDto = Mapper.Map<CreateGameDto>(createGameRequest);
        createGameDto.CreatingPlayer.Id = user.Id;
        createGameDto.CreatingPlayer.Username = user.Username;
        
        var createdGame = GamesService.CreateGame(createGameDto);
        var gameId = createdGame.Id;
        var createdGameSerialized = JsonConvert.SerializeObject(createdGame);
        
        await HttpContext.InitServerSentEventAsync();
        await HttpContext.SendServerSentEventAsync(new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = createdGameSerialized,
        });
        await GameListSseService.SendEventAsync(new ServerSentEvent
        {
            Name = GameListEvents.GameCreated,
            Data = createdGameSerialized
        });
        
        GameSseService.CreateGroup(gameId, HttpContext);
        HttpContext.RequestAborted.WaitHandle.WaitOne();
        await OnClientDisconnected(gameId, user.Id);
    }
    
    [HttpGet("join")]
    [Authorize]
    [ModelStateValidation]
    public async Task JoinGame(JoinGameRequest joinGameRequest)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        var joinGameDto = new JoinGameDto
        {
            GameId = joinGameRequest.GameId,
            JoiningPlayer = new PlayerDto
            {
                Id = user.Id,
                Username = user.Username
            },
        };
        
        var joinedGame = GamesService.JoinGame(joinGameDto);
        var gameId = joinedGame.Id;
        var joinedGameSerialized = JsonConvert.SerializeObject(joinedGame);
        
        await HttpContext.InitServerSentEventAsync();
        
        GameSseService.AddClient(gameId, HttpContext);
        
        await GameSseService.SendEventAsync(gameId, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = joinedGameSerialized,
        });
        await GameListSseService.SendEventAsync(new ServerSentEvent
        {
            Name = GameListEvents.GameUpdated,
            Data = joinedGameSerialized
        });
        
        HttpContext.RequestAborted.WaitHandle.WaitOne();
        await OnClientDisconnected(gameId, user.Id);
    }

    [HttpPut("select-realm/{gameId}/{selectedRealmId}")]
    [Authorize]
    public async Task SelectRealm(Guid gameId, long selectedRealmId)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        await RealmsService.GetUserRealm(user.Id, selectedRealmId);
        
        var gameResponseDto = GamesService.SelectRealm(new SelectRealmDto
        {
            GameId = gameId,
            RealmId = selectedRealmId,
            UserId = user.Id
        });

        await GameSseService.SendEventAsync(gameResponseDto.Id, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = gameResponseDto,
        });
    }
    
    [HttpPut("ready/{gameId}/{value}")]
    [Authorize]
    public async Task SetPlayerReady(Guid gameId, bool value)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        
        var gameResponseDto = GamesService.SetPlayerIsReady(new PlayerIsReadyDto
        {
            GameId = gameId,
            UserId = user.Id
        }, value);

        await GameSseService.SendEventAsync(gameResponseDto.Id, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = gameResponseDto,
        });
    }
    
    [HttpDelete("leave/{gameId}")]
    [Authorize]
    public async Task LeaveGame(Guid gameId)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        
        var gameResponseDto = GamesService.LeaveGame(new LeaveGameDto
        {
            GameId = gameId,
            UserId = user.Id
        });

        await GameSseService.SendEventAsync(gameResponseDto.Id, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = gameResponseDto,
        });
    }
    
    [HttpDelete("kick/{gameId}/{kickedUserId}")]
    [Authorize]
    public async Task KickPlayer(Guid gameId, long kickedUserId)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        
        var gameResponseDto = GamesService.KickPlayer(new KickPlayerDto
        {
            GameId = gameId,
            KickingUserId = user.Id,
            KickedUserId = kickedUserId
        });

        var response = JsonConvert.SerializeObject(gameResponseDto);
        
        if (gameResponseDto.Status == GameStatus.Preparing)
        {
            await GameListSseService.SendEventAsync(new ServerSentEvent
            {
                Name = GameListEvents.GameUpdated,
                Data = response
            });
        }
        
        await GameSseService.SendEventAsync(gameResponseDto.Id, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = response,
        });
    }

    [HttpPut("start/{gameId}")]
    [Authorize]
    public async Task StartGame(Guid gameId)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        
        var gameResponseDto = GamesService.StartGame(new StartGameDto
        {
            GameId = gameId,
            AttemptingUserId = user.Id
        });

        var response = JsonConvert.SerializeObject(gameResponseDto);
        
        await GameSseService.SendEventAsync(gameResponseDto.Id, new ServerSentEvent
        {
            Name = GameEvents.GameData,
            Data = response,
        });
        
        await GameListSseService.SendEventAsync(new ServerSentEvent
        {
            Name = GameListEvents.GameDeleted,
            Data = response
        });
    }

    [HttpPost("chat")]
    [Authorize]
    [ModelStateValidation]
    public async Task SendMessageToChat([FromBody] SendMessageToChatRequest sendMessageToChatRequest)
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        var game = GamesService.GetGame(sendMessageToChatRequest.GameId);
        var player = game.Players.FirstOrDefault(p => p.Id == user.Id);
        if (player == null)
        {
            throw new BadRequestException(GamesErrorMessages.PlayerNotFound);
        }

        var response = new SendMessageToChatResponse
        {
            AuthorId = player.Id,
            AuthorUsername = player.Username,
            AuthorPlayerIndex = (short)game.Players.IndexOf(player),
            Message = sendMessageToChatRequest.Message,
            Time = DateTime.UtcNow,
        };
        
        await GameSseService.SendEventAsync(game.Id, new ServerSentEvent
        {
            Name = GameEvents.ChatMessage,
            Data = response,
        });
    }
}