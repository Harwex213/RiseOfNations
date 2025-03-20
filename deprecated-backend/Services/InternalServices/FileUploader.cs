using Common.Constants.Configuration;
using Services.InternalServices.Interfaces;
using Services.InternalServices.Dtos;

namespace Services.InternalServices;

public class FileUploader : IFileUploader
{
    public async Task UploadRealmFlag(FileUpload fileUpload)
    {
        var folderPath = Path.Combine(FileUploaderConfiguration.WebRootPath, FileUploaderConfiguration.RealmsUploadFolder);
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
        var fileExtension = Path.GetExtension(fileUpload.SourceFileName);
        var path = Path.Combine(folderPath, fileUpload.FileName + fileExtension);
        await File.WriteAllBytesAsync(path, Convert.FromBase64String(fileUpload.SourceBase64));
    }
}