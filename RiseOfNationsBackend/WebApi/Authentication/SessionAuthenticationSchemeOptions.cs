using Microsoft.AspNetCore.Authentication;

namespace WebApi.Authentication;

public class SessionAuthenticationSchemeOptions : AuthenticationSchemeOptions
{
    public const string SchemeName = "SessionAuthenticationScheme";
    public const string AuthenticationType = "Session";
    public string SessionRoleKeyName { get; set; } = "SESSION_ROLE";
}