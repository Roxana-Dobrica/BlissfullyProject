using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class MaterialRepository : BaseRepository<Material>, IMaterialRepository
    {
        public MaterialRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<Material>>> FindByPatientIdAndTypeAsync(Guid patientId, MaterialCategory type)
        {
            var results = await context.Set<Material>().Where(x => x.UserId == patientId && x.Category == type).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<Material>>.Failure($"Entity with PatientId {patientId} and Type {type} not found.");
            }
            return Result<IEnumerable<Material>>.Success(results);
        }
    }
}
