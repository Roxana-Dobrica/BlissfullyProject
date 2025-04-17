using Blissfully.Application.Models.Identity;

namespace Blissfully.Application.Contracts.Identity
{
    public interface IAuthService
    {
        Task<(int, string)> Registration(RegistrationModel model, string role);
        Task<(int, string)> Login(LoginModel model);
        Task<(int, string)> Logout();
        Task<(int, string)> ForgotPassword(ForgotPasswordModel model);
        Task<(int, string)> ResetPassword(ResetPasswordModel model);

    }
}
