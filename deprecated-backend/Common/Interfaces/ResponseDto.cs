namespace Common.Interfaces;

public abstract  class ResponseDto
{
    public long Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
}