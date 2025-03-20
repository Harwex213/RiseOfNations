using AutoMapper;
using DataTransferObjects.Rest.Realm;
using DataTransferObjects.Rpc.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.RestServices.Interfaces;
using Services.RpcServices.Interfaces;
using WebApi.Constants;
using WebApi.Dtos.Realms;
using WebApi.Extensions;
using WebApi.Filters;

namespace WebApi.RpcControllers;

[Route("api/[controller]")]
public class RealmsController : Controller
{
    public RealmsController(IRealmsService realmsService, IRestService<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto> realmService, IMapper mapper)
    {
        RealmsService = realmsService;
        RealmService = realmService;
        Mapper = mapper;
    }

    public IRealmsService RealmsService { get; set; }
    public IRestService<CreateRealmRequestDto, UpdateRealmRequestDto, RealmResponseDto> RealmService { get; set; }
    public IMapper Mapper { get; set; }

    [HttpGet]
    [Authorize]
    public async Task<ICollection<RealmResponseDto>> GetUserRealms()
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        return await RealmsService.GetUserRealms(user.Id);
    }

    [HttpGet("{realmId}")]
    [Authorize]
    public async Task<RealmResponseDto> GetRealm(long realmId)
    {
        return await RealmsService.GetRealm(realmId);
    }
    
    [HttpPost("create")]
    [Authorize]
    public async Task<RealmResponseDto> CreateRealm([FromBody] CreateRealmRequest createRealmRequest)
    {
        var createRealmDto = Mapper.Map<CreateRealmRequestDto>(createRealmRequest);
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        createRealmDto.UserId = user.Id;
        return await RealmService.Add(createRealmDto);
    }
    
    [HttpPut("update/{realmId}")]
    [Authorize]
    [ModelStateValidation]
    public async Task<RealmResponseDto> UpdateRealm(long realmId, [FromBody] CreateRealmRequest createRealmRequest)
    {
        var createRealmDto = Mapper.Map<UpdateRealmRequestDto>(createRealmRequest);
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        createRealmDto.UserId = user.Id;
        return await RealmService.Update(realmId, createRealmDto);
    }
    
    [HttpDelete("delete/{realmId}")]
    [Authorize]
    public async Task<RealmResponseDto> DeleteRealm(long realmId)
    {
        return await RealmService.Delete(realmId);
    }
}