using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Services.RpcServices.Interfaces;
using WebApi.Constants;
using WebApi.Extensions;
using WebApi.Services;

namespace WebApi.RpcControllers;

[Route("api/[controller]")]
public class GamesController : Controller
{
    public GamesController(IGamesService gamesService, IGameListSseService gameListSseService, IMapper mapper)
    {
        GamesService = gamesService;
        GameListSseService = gameListSseService;
        Mapper = mapper;
    }

    public IGamesService GamesService { get; set; }
    public IGameListSseService GameListSseService { get; set; }
    public IMapper Mapper { get; set; }

    [HttpGet("subscribe")]
    public async Task SubscribeToGameList()
    {
        var games = GamesService.GetJoinableGames();
        
        await HttpContext.InitServerSentEventAsync();
        await HttpContext.SendServerSentEventAsync(new ServerSentEvent
        {
            Name = GameListEvents.GameList,
            Data = games
        });
        
        GameListSseService.AddClient(HttpContext);

        HttpContext.RequestAborted.WaitHandle.WaitOne();
        
        GameListSseService.RemoveClient(HttpContext);
    }
}