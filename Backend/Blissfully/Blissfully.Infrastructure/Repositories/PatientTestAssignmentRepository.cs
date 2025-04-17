using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace Blissfully.Infrastructure.Repositories
{
    public class PatientTestAssignmentRepository : BaseRepository<PatientTestAssignment>, IPatientTestAssignmentRepository
    {
        public PatientTestAssignmentRepository(BlissfullyContext context) : base(context)
        {
        }
        public async Task<Result<IEnumerable<PatientTestAssignment>>> FindByPatientIdAsync(Guid id)
        {
            var results = await context.Set<PatientTestAssignment>().Where(x => x.PatientId == id).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<PatientTestAssignment>>.Failure($"No entities found with PatientId {id}.");
            }
            return Result<IEnumerable<PatientTestAssignment>>.Success(results);
        }

        public async Task<Result<IEnumerable<PatientTestAssignment>>> FindByTestIdAsync(Guid testId)
        {
            var results = await context.Set<PatientTestAssignment>().Where(x => x.TestId == testId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<PatientTestAssignment>>.Failure($"No entities found with TestId {testId}.");
            }
            return Result<IEnumerable<PatientTestAssignment>>.Success(results);
        }

        public async Task<Result<PatientTestAssignment>> FindByPatientAndTestIdAsync(Guid patientId, Guid testId)
        {
            var result = await context.Set<PatientTestAssignment>().FirstOrDefaultAsync(x => x.PatientId == patientId && x.TestId == testId);
            if (result == null)
            {
                return Result<PatientTestAssignment>.Failure($"Entity with PatientId {patientId} and TestId {testId} not found.");
            }
            return Result<PatientTestAssignment>.Success(result);
        }

        public virtual async Task<Result<PatientTestAssignment>> DeleteByPatientAndTestIdAsync(Guid patientId, Guid testId)
        {
            var result = await FindByPatientAndTestIdAsync(patientId, testId);
            if (result != null)
            {
                context.Set<PatientTestAssignment>().Remove(result.Value);
                await context.SaveChangesAsync();
                return Result<PatientTestAssignment>.Success(result.Value);
            }
            return Result<PatientTestAssignment>.Failure($"Entity with patientId {patientId} and testId {testId} not found");
        }

        public virtual async Task<Result<IEnumerable<PatientTestAssignment>>> DeleteByTestIdAsync(Guid testId)
        {
            var result = await FindByTestIdAsync(testId);
            if (result != null && result.IsSuccess && result.Value.Any())
            {
                context.Set<PatientTestAssignment>().RemoveRange(result.Value);
                await context.SaveChangesAsync();
                return Result<IEnumerable<PatientTestAssignment>>.Success(result.Value);
            }
            return Result<IEnumerable<PatientTestAssignment>>.Failure($"Entities with testId {testId} not found");
        }
    }
}
