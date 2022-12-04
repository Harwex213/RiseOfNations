using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace WebApi.Authentication;

public class SessionAuthenticationSchemeHandler : AuthenticationHandler<SessionAuthenticationSchemeOptions>, IAuthenticationSignInHandler
{

    public SessionAuthenticationSchemeHandler(IOptionsMonitor<SessionAuthenticationSchemeOptions> options, 
        ILoggerFactory logger, 
        UrlEncoder encoder, 
        ISystemClock clock) : base(options, logger, encoder, clock)
    {
    }
    
    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var userRole = Context.Session.GetString(Options.SessionRoleKeyName);
        if (userRole == null)
        {
            return Task.FromResult(AuthenticateResult.Fail("Invalid session"));
        }
        
        var claimsIdentity = new ClaimsIdentity(SessionAuthenticationSchemeOptions.AuthenticationType);
        claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, userRole));
        var principal = new ClaimsPrincipal(claimsIdentity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);
        
        return Task.FromResult(AuthenticateResult.Success(ticket));
    }

    public Task SignInAsync(ClaimsPrincipal user, AuthenticationProperties? properties)
    {
        Context.Session.SetString(Options.SessionRoleKeyName, user.FindFirstValue(ClaimTypes.Role));
        return Task.CompletedTask;
    }

    public Task SignOutAsync(AuthenticationProperties? properties)
    {
        if (Context.Session.Keys.Contains(Options.SessionRoleKeyName))
        {
            Context.Session.Remove(Options.SessionRoleKeyName);
        }
        return Task.CompletedTask;
    }
}