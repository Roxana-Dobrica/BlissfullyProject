using Blissfully.Application.Contracts;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace Blissfully.Infrastructure.Services
{
    public class FirebaseService : IFirebaseService
    {
        private readonly StorageClient _storageClient;
        private readonly string _bucketName = "blissfully-ce467.appspot.com";

        public FirebaseService()
        {
            var credentialPath = Path.Combine("..", "Blissfully.Infrastructure", "Credentials", "blissfully-ce467-firebase-adminsdk-p96r5-1f9ab87015.json");
            var googleCredential = GoogleCredential.FromFile(credentialPath);

            _storageClient = StorageClient.Create(googleCredential);
        }

        public async Task<string> UploadFileAsync(string bucketName, Stream fileStream, string objectName)
        {
            var dataObject = await _storageClient.UploadObjectAsync(bucketName, objectName, null, fileStream);
            return objectName;
        }

    }
}
