namespace Blissfully.Application.Contracts
{
    public interface IFirebaseService
    {
        Task<string> UploadFileAsync(string bucketName, Stream fileStream, string objectName);
    }
}
