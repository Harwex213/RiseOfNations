using System.Net;
using Services.Exceptions.Base;

namespace Services.Exceptions;

public class NotAuthorizedException : ServiceException
{
    public NotAuthorizedException(string message = "Unauthorized") : base(message)
    {
        HttpCode = (int)HttpStatusCode.Unauthorized;
    }
}