using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class ActivityRepository : BaseRepository<Activity>, IActivityRepository
    {
        public ActivityRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<Activity>>> FindByPatientIdAsync(Guid patientId)
        {
            var results = await context.Set<Activity>().Where(x => x.UserId == patientId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<Activity>>.Failure($"Entity with PatientId {patientId} not found.");
            }
            return Result<IEnumerable<Activity>>.Success(results);
        }
    }
}
