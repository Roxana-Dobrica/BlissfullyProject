using Blissfully.Application.Contracts;
using Blissfully.Application.Models;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;

namespace Blissfully.Infrastructure.Services
{
    public class EncryptionService : IEncryptionService
    {
        private readonly byte[] encryptionKey;

        public EncryptionService(IOptions<EncryptionSettings> encryptionSettings)
        {
            encryptionKey = Convert.FromBase64String(encryptionSettings.Value.EncryptionKey);
        }

        public string Encrypt(string plainText)
        {
            byte[] iv;
            using (Aes aes = Aes.Create())
            {
                aes.Key = encryptionKey;
                aes.GenerateIV(); // Generate a random IV
                iv = aes.IV;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, iv);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    memoryStream.Write(iv, 0, iv.Length); // Write IV to the beginning of the stream
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter(cryptoStream, Encoding.UTF8))
                        {
                            streamWriter.Write(plainText);
                        }
                    }

                    return Convert.ToBase64String(memoryStream.ToArray());
                }
            }
        }

        public string Decrypt(string cipherText)
        {
            byte[] buffer = Convert.FromBase64String(cipherText);
            byte[] iv = new byte[16];
            Array.Copy(buffer, 0, iv, 0, iv.Length);

            byte[] encryptedData = new byte[buffer.Length - iv.Length];
            Array.Copy(buffer, iv.Length, encryptedData, 0, encryptedData.Length);

            using (Aes aes = Aes.Create())
            {
                aes.Key = encryptionKey;
                aes.IV = iv;

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(encryptedData))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader(cryptoStream, Encoding.UTF8))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }
    }
}
