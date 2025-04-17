using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class Material : AuditableEntity
    {
        private Material(Guid userId, string materialTitle, string materialUrl, DateTime materialDateAdded, MaterialCategory category)
        {
            MaterialId = Guid.NewGuid();
            UserId = userId;
            MaterialTitle = materialTitle;
            MaterialUrl = materialUrl;
            MaterialDateAdded = materialDateAdded;
            Category = category;
            AddedByDoctorId = null;
            IsFavorite = false;
        }
        public Guid MaterialId { get; private set; }
        public Guid UserId { get; private set; }
        public string MaterialTitle { get; private set; } = string.Empty;
        public string MaterialUrl { get; private set; } = string.Empty;
        public DateTime MaterialDateAdded { get; private set; }
        public string? MaterialDescription { get; private set; }
        public MaterialCategory Category { get; private set; }
        public Guid? AddedByDoctorId { get; private set; }
        public bool IsFavorite { get; private set; }

        public static Result<Material> Create(Guid userId, string materialTitle, string materialUrl, MaterialCategory category)
        {
            if(string.IsNullOrWhiteSpace(materialTitle))
            {
                return Result<Material>.Failure("Material title is required");
            }
            if(string.IsNullOrWhiteSpace(materialUrl))
            {
                return Result<Material>.Failure("Material URL is required");
            }
            var materialDateAdded = DateTime.UtcNow;
            return Result<Material>.Success(new Material(userId, materialTitle, materialUrl, materialDateAdded, category));
        }

        public void Update(string materialTitle, string materialUrl, string materialDescription, bool isFavorite)
        {
            if (!string.IsNullOrWhiteSpace(materialTitle))
            {
                MaterialTitle = materialTitle;
            }
            if (!string.IsNullOrWhiteSpace(materialUrl))
            {
                MaterialUrl = materialUrl;
            }
            MaterialDescription = materialDescription;
            IsFavorite = isFavorite;
        }

        public void AttachDescription(string materialDescription)
        {
            if (!string.IsNullOrWhiteSpace(materialDescription))
            {
                MaterialDescription = materialDescription;
            }
        }

        public void MarkAsFavorite()
        {
            IsFavorite = true;
        }
        public void MarkAsUnfavorite()
        {
            IsFavorite = false;
        }

        public void SetAddedByDoctor(Guid? doctorId)
        {
            if (doctorId != Guid.Empty)
            {
                AddedByDoctorId = doctorId;
            }
        }
    }
}
