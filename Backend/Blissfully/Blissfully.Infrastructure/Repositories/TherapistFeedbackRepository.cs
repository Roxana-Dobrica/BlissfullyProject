using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class TherapistFeedbackRepository : BaseRepository<TherapistFeedback>, ITherapistFeedbackRepository
    {
        public TherapistFeedbackRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<TherapistFeedback>>> FindByPatientIdAsync(Guid patientId)
        {
            var results = await context.Set<TherapistFeedback>().Where(x => x.UserId == patientId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<TherapistFeedback>>.Failure($"Entity with PatientId {patientId} not found.");
            }
            return Result<IEnumerable<TherapistFeedback>>.Success(results);
        }
    }
}
