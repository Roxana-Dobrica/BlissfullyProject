using System.Security.Cryptography;

namespace Blissfully.Infrastructure.Services
{
    public class KeyGenerator
    {
        public static byte[] GenerateKey()
        {
            byte[] data = new byte[32];
            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(data);
            }
            return data;
        }
    }
}
