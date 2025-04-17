using Blissfully.Application.Contracts;
using Blissfully.Application.Contracts.Identity;
using Blissfully.Application.Models;
using Blissfully.Application.Models.Identity;
using Blissfully.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Blissfully.Identity.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly IEmailService emailService;
        private readonly IEncryptionService encryptionService;
        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, IConfiguration configuration, SignInManager<ApplicationUser> signInManager, IEncryptionService encryptionService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            this.emailService = emailService;
            this.signInManager = signInManager;
            this.encryptionService = encryptionService;
        }
        public async Task<(int, string)> Registration(RegistrationModel model, string role)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return (0, "User already exists");

            var userExistsEmail = await userManager.FindByEmailAsync(model.Email);
            if (userExistsEmail != null)
                return (0, "Email already exists");

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                GivenName = encryptionService.Encrypt(model.GivenName),
                Surname = encryptionService.Encrypt(model.Surname),
            };
            var createUserResult = await userManager.CreateAsync(user, model.Password!);
            if (!createUserResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again.");


            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

            switch (role)
            {
                case UserRole.Admin:
                    await userManager.AddToRoleAsync(user, UserRole.Admin);
                    break;
                case UserRole.Patient:
                    await userManager.AddToRoleAsync(user, UserRole.Patient);
                    break;
                case UserRole.Therapist:
                    await userManager.AddToRoleAsync(user, UserRole.Therapist);
                    break;
                default:
                    return (0, "Invalid role");
            }

            return (1, "User created successfully!");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username!);
            if (user == null)
                return (0, "Invalid credentials!");
            if (!await userManager.CheckPasswordAsync(user, model.Password!))
                return (0, "Invalid credentials!");

            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            string token = GenerateToken(authClaims);
            return (1, token);
        }

        public async Task<(int, string)> Logout()
        {
            await signInManager.SignOutAsync();
            return (1, "User logged out successfully!");
        }

        public async Task<(int, string)> ForgotPassword(ForgotPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return (0, "Invalid credentials!");

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var email = new Mail
            {
                Body = "Please reset your password by clicking here: <a href=\"http://localhost:5173/resetpassword?email=" + model.Email + "&token=" + token + "\">link</a>",
                To = model.Email,
                Subject = "[Blissfully - Reset Password]",
            };

            try
            {
                await emailService.SendEmailAsync(email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return (1, "Please check your email for password reset instructions");
        }

        public async Task<(int, string)> ResetPassword(ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return (0, "Invalid credentials!");

            var resetPassResult = await userManager.ResetPasswordAsync(user, model.Token, model.Password);

            if (!resetPassResult.Succeeded)
                return (0, "Invalid credentials!");

            return (1, "Password reset successfully!");
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = configuration["JWT:ValidIssuer"]!,
                Audience = configuration["JWT:ValidAudience"]!,
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
