using System.Net;

namespace Services.Exceptions.Base;

public class ServiceException : ApplicationException
{
    public ServiceException(string message = "Internal server error") : base(message) 
    {
        HttpCode = (int)HttpStatusCode.InternalServerError;
    }

    public int HttpCode { get; set; }
}