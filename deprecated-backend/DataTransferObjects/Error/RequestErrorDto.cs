namespace DataTransferObjects.Error;

public class RequestErrorDto
{
    public RequestErrorDto(string message)
    {
        Message = message;
    }

    public string Message { get; set; }
}