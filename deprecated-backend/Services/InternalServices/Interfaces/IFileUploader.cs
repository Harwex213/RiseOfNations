using Services.InternalServices.Dtos;

namespace Services.InternalServices.Interfaces;

public interface IFileUploader
{
    public Task UploadRealmFlag(FileUpload fileUpload);
}