using Blissfully.Application.Contracts;
using Blissfully.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Identity.Services
{
    public class UserService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEncryptionService encryptionService;
        private readonly IFirebaseService firebaseService;

        private readonly string _bucketName = "blissfully-ce467.appspot.com";

        public UserService(UserManager<ApplicationUser> userManager, IEncryptionService encryptionService, IFirebaseService firebaseService)
        {
            this.userManager = userManager;
            this.encryptionService = encryptionService;
            this.firebaseService = firebaseService;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var users = await userManager.Users.ToListAsync();
            var userModels = new List<UserDto>();
            foreach (var user in users)
            {
                var userModel = new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    GivenName = encryptionService.Decrypt(user.GivenName),
                    Surname = encryptionService.Decrypt(user.Surname),
                    Email = user.Email,
                    Gender = user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    PhoneNumber = encryptionService.Decrypt(user.PhoneNumber),
                    City = encryptionService.Decrypt(user.City),
                    Country = encryptionService.Decrypt(user.Country),
                    ProfileImageUrl = user.ProfileImageUrl
                };
                userModels.Add(userModel);
            }
            return userModels;
        }

        public async Task<UserDto> GetById(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            var ApplicationUser = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                GivenName = encryptionService.Decrypt(user.GivenName),
                Surname = encryptionService.Decrypt(user.Surname),
                Email = user.Email,
                Gender = user.Gender,
                DateOfBirth = user.DateOfBirth,
                PhoneNumber = user.PhoneNumber != null ? encryptionService.Decrypt(user.PhoneNumber) : user.PhoneNumber,
                City = user.City != null ? encryptionService.Decrypt(user.City) : user.City,
                Country = user.Country != null ? encryptionService.Decrypt(user.Country) : user.Country,
                ProfileImageUrl = user.ProfileImageUrl
            };
            return ApplicationUser;
        }

        public async Task<UserDto> GetByUserName(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return null;
            }
            var ApplicationUser = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                GivenName = encryptionService.Decrypt(user.GivenName),
                Surname = encryptionService.Decrypt(user.Surname),
                Email = user.Email,
                Gender = user.Gender,
                DateOfBirth = user.DateOfBirth,
                PhoneNumber = user.PhoneNumber != null ? encryptionService.Decrypt(user.PhoneNumber) : user.PhoneNumber,
                City = user.City != null ? encryptionService.Decrypt(user.City) : user.City,
                Country = user.Country != null ? encryptionService.Decrypt(user.Country) : user.Country,
                ProfileImageUrl = user.ProfileImageUrl
            };
            return ApplicationUser;
        }

        public async Task<(int, string)> Update(UserDto model)
        {
            var user = await userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return (0, "User not found!");
            }
            user.UserName = model.UserName;
            user.GivenName = encryptionService.Encrypt(model.GivenName);
            user.Surname = encryptionService.Encrypt(model.Surname);
            user.Email = model.Email;
            user.Gender = model.Gender;
            user.DateOfBirth = model.DateOfBirth;
            user.PhoneNumber = model.PhoneNumber != null ? encryptionService.Encrypt(model.PhoneNumber) : model.PhoneNumber;
            user.City = model.City != null ? encryptionService.Encrypt(model.City) : model.City;
            user.Country = model.Country != null ? encryptionService.Encrypt(model.Country) : model.Country;
            user.ProfileImageUrl = model.ProfileImageUrl;

            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return (1, "User updated successfully!");
            }
            else
            {
                return (0, "User update failed!");
            }
        }

        public async Task<(int, string)> Delete(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return (0, "User not found!");
            }
            var result = await userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return (1, "User deleted successfully!");
            }
            else
            {
                return (0, "User delete failed!");
            }
        }

        public async Task<string> UploadProfileImageAsync(string userId, Stream fileStream, string fileName)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found!");
            }

            var objectName = $"profile_pictures/{Guid.NewGuid()}_{fileName}";
            var url = await firebaseService.UploadFileAsync(_bucketName, fileStream, objectName);
            user.ProfileImageUrl = url;

            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception("Failed to update user with profile image URL.");
            }

            return url;
        }
    }
}
