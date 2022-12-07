using DataTransferObjects.Rpc.GameInfo;
using Microsoft.AspNetCore.Mvc;
using Services.RpcServices.Interfaces;

namespace WebApi.RpcControllers;

[Route("api/[controller]")]
public class GameInfoController : Controller
{
    public GameInfoController(IGameInfoService service)
    {
        Service = service;
    }

    public IGameInfoService Service { get; set; }
    
    [HttpGet]
    public async Task<GameInfoResponseDto> GetGameInfo()
    {
        return await Service.GetGameInfo();
    }
}