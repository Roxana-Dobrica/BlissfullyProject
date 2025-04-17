namespace Blissfully.Identity.Services
{
    public class UserDto
    {
        public string Id { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string GivenName { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; } 
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
