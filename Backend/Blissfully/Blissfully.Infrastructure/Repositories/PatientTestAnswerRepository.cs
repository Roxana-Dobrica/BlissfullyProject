using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class PatientTestAnswerRepository : BaseRepository<PatientTestAnswer>, IPatientTestAnswerRepository
    {
        public PatientTestAnswerRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<PatientTestAnswer>>> FindByTestIdAsync(Guid testId)
        {
            var results = await context.Set<PatientTestAnswer>().Where(x => x.TestId == testId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<PatientTestAnswer>>.Failure($"No entities found with TestId {testId}.");
            }
            return Result<IEnumerable<PatientTestAnswer>>.Success(results);
        }

        public virtual async Task<Result<IEnumerable<PatientTestAnswer>>> FindByPatientAndTestIdAsync(Guid patientId, Guid testId)
        {
            var results = await context.Set<PatientTestAnswer>().Where(x => x.PatientId == patientId && x.TestId == testId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<PatientTestAnswer>>.Failure($"No entities found with PatientId {patientId} and TestId {testId}.");
            }
            return Result<IEnumerable<PatientTestAnswer>>.Success(results);
        }

        public virtual async Task<Result<IEnumerable<PatientTestAnswer>>> DeleteByTestIdAsync(Guid testId)
        {
            var result = await FindByTestIdAsync(testId);
            if (result != null && result.IsSuccess && result.Value.Any())
            {
                context.Set<PatientTestAnswer>().RemoveRange(result.Value);
                await context.SaveChangesAsync();
                return Result<IEnumerable<PatientTestAnswer>>.Success(result.Value);
            }
            return Result<IEnumerable<PatientTestAnswer>>.Failure($"Entities with testId {testId} not found");
        }
    }
}
