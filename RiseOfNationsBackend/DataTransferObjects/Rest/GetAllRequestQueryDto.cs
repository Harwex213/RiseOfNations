namespace DataTransferObjects.Rest;

public class GetAllRequestQueryDto
{
    public string? Filter { get; set; }
    public string? Range { get; set; }
    public string? Sort { get; set; }
}