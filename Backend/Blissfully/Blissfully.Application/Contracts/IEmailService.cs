using Blissfully.Application.Models;

namespace Blissfully.Application.Contracts
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(Mail email);
    }
}
