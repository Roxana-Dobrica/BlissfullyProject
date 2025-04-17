using System.ComponentModel.DataAnnotations;

namespace Blissfully.Application.Models.Identity
{
    public class ForgotPasswordModel
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
    }
}
