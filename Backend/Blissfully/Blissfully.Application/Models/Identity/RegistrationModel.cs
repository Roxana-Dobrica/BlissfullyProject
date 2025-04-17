using System.ComponentModel.DataAnnotations;

namespace Blissfully.Application.Models.Identity
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Given Name is required")]
        public string? GivenName { get; set; }
        [Required(ErrorMessage = "Surname is required")]
        public string? Surname { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
