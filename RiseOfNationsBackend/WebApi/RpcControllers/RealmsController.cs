using DataTransferObjects.Rest.Realm;
using DataTransferObjects.Rpc.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.RpcServices.Interfaces;
using WebApi.Constants;
using WebApi.Extensions;

namespace WebApi.RpcControllers;

[Route("api/[controller]")]
public class RealmsController : Controller
{
    public RealmsController(IRealmsService service)
    {
        Service = service;
    }

    public IRealmsService Service { get; set; }

    [HttpGet]
    [Authorize]
    public async Task<ICollection<RealmResponseDto>> GetUserRealms()
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        return await Service.GetUserRealms(user.Id);
    }

    [HttpGet("{realmId}")]
    [Authorize]
    public async Task<RealmResponseDto> GetRealm(long realmId)
    {
        return await Service.GetRealm(realmId);
    }
}