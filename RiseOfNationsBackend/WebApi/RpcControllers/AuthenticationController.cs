using System.Security.Claims;
using Common.Constants;
using Common.Constants.ErrorMessages;
using DataTransferObjects.Rpc.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.RpcServices.Interfaces;
using WebApi.Authentication;
using WebApi.Configuration;
using WebApi.Extensions;
using WebApi.Filters;

namespace WebApi.RpcControllers;

[Route("api/[controller]")]
public class AuthenticationController : Controller
{
    public AuthenticationController(IAuthService service)
    {
        Service = service;
    }

    public IAuthService Service { get; set; }
    
    private async Task SignInAsync(DescribeUserResponseDto user)
    {
        var claimsIdentity = new ClaimsIdentity(SessionAuthenticationSchemeOptions.AuthenticationType);
        claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, user.UserRole));
        await HttpContext.SignInAsync(new ClaimsPrincipal(claimsIdentity));
        
        HttpContext.Session.Set(SessionConfiguration.UserDataKeyName, user);
    }
    
    
    [HttpPost("register")]
    [ModelStateValidation]
    public async Task<DescribeUserResponseDto> Register([FromBody] RegisterDto registerDto)
    {
        if (HttpContext.User.Identity is { IsAuthenticated: true })
        {
            throw new BadRequestException(AuthenticationErrorMessages.UserAlreadyAuthenticated);
        }
        
        var user = await Service.Register(registerDto);
        await SignInAsync(user);
        return user;
    }
    
    [HttpPost("login")]
    [ModelStateValidation]
    public async Task<DescribeUserResponseDto> Login([FromBody] LoginDto loginDto)
    {
        if (HttpContext.User.Identity is { IsAuthenticated: true })
        {
            throw new BadRequestException(AuthenticationErrorMessages.UserAlreadyAuthenticated);
        }

        var user = await Service.Login(loginDto);
        await SignInAsync(user);
        return user;
    }
    
    [HttpPost("admin-login")]
    [ModelStateValidation]
    public async Task<DescribeUserResponseDto> AdminLogin([FromBody] LoginDto loginDto)
    {
        if (HttpContext.User.Identity is { IsAuthenticated: true })
        {
            throw new BadRequestException(AuthenticationErrorMessages.UserAlreadyAuthenticated);
        }

        var user = await Service.Login(loginDto, UserRoles.Admin);
        await SignInAsync(user);
        return user;
    }

    [HttpGet("describe")]
    [Authorize]
    public Task<DescribeUserResponseDto> DescribeUser()
    {
        var user = HttpContext.Session.Get<DescribeUserResponseDto>(SessionConfiguration.UserDataKeyName);
        return Task.FromResult(user);
    }
    
    [HttpDelete("logout")]
    [Authorize]
    public async Task Logout()
    {
        HttpContext.Session.Remove(SessionConfiguration.UserDataKeyName);
        await HttpContext.SignOutAsync();
    }
}