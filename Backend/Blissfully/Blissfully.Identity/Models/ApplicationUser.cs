using Microsoft.AspNetCore.Identity;

namespace Blissfully.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? GivenName { get; set; }
        public string? Surname { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? PhoneNumber {  get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
