namespace Services.Exceptions;

public class NotFoundException : ApplicationException
{
    public NotFoundException(string message = "Not found") : base(message) 
    {
        
    }
}