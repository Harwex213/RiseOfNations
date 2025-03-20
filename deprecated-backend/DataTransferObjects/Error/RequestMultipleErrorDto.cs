namespace DataTransferObjects.Error;

public class RequestMultipleErrorDto
{
    public RequestMultipleErrorDto()
    {
        Errors = new Dictionary<string, string?>();
    }
    
    public Dictionary<string, string?> Errors { get; set; }
}