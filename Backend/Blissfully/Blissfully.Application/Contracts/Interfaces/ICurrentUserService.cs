using System.Security.Claims;

namespace Blissfully.Application.Contracts.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        ClaimsPrincipal GetCurrentClaimsPrincipal();
        string GetCurrentUserId();
    }
}
