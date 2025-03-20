using System.Net;
using Services.Exceptions.Base;

namespace Services.Exceptions;

public class BadRequestException : ServiceException
{
    public BadRequestException(string message = "Bad request") : base(message) 
    {
        HttpCode = (int)HttpStatusCode.BadRequest;
    }
}