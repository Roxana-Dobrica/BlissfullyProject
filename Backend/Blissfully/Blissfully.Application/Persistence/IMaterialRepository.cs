using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IMaterialRepository : IAsyncRepository<Material>
    {
        public Task<Result<IEnumerable<Material>>> FindByPatientIdAndTypeAsync(Guid patientId, MaterialCategory type);
    }
}
