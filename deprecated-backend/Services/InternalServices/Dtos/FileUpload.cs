namespace Services.InternalServices.Dtos;

public class FileUpload
{
    public Guid FileName { get; set; }
    public string SourceBase64 { get; set; }
    public string SourceFileName { get; set; }
}