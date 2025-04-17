using Blissfully.Domain.Common;

namespace Blissfully.Application.Features.Materials.Commands
{
    public class IMaterialCommand
    {
        public Guid UserId { get; set; }
        public string MaterialTitle { get; set; } = string.Empty;
        public string MaterialUrl { get; set; } = string.Empty;
        public DateTime MaterialDateAdded { get; set; }
        public string? MaterialDescription { get; set; }
        public MaterialCategory Category { get; set; }
        public Guid? AddedByDoctorId { get; set; }
        public bool IsFavorite { get; set; } = false;
    }
}
