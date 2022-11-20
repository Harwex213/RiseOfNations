namespace Services.Exceptions;

public class BadRequestException : ApplicationException
{
    public BadRequestException(string message = "Bad request") : base(message) 
    {
        
    }
}