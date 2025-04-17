using Blissfully.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blissfully.Application.Features.Materials.Commands.UpdateMaterial
{
    public class UpdateMaterialDto
    {
        public Guid MaterialId { get; set; }
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
