using System.Net;
using Services.Exceptions.Base;

namespace Services.Exceptions;

public class NotFoundException : ServiceException
{
    public NotFoundException(string message = "Not found") : base(message)
    {
        HttpCode = (int)HttpStatusCode.NotFound;
    }
}