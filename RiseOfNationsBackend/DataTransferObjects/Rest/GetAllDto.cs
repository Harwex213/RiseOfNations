namespace DataTransferObjects.Rest;

public class GetAllDto
{
    public string? Filter { get; set; }
    public (int from, int to)? Range { get; set; }
    public (string property, string order)? Sort { get; set; }
}