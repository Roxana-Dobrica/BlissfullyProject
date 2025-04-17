using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class PatientTherapistRepository : BaseRepository<PatientTherapist>, IPatientTherapistRepository
    {
        public PatientTherapistRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<PatientTherapist>>> FindByTherapistIdAsync(Guid therapistId)
        {
            var results = await context.Set<PatientTherapist>().Where(x => x.TherapistId == therapistId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<PatientTherapist>>.Failure($"No entities found with TherapistId {therapistId}.");
            }
            return Result<IEnumerable<PatientTherapist>>.Success(results);
        }

        public virtual async Task<Result<PatientTherapist>> FindByPatientIdAsync(Guid patientId)
        {
            var result = await context.Set<PatientTherapist>().FirstOrDefaultAsync(x => x.PatientId == patientId);
            if (result == null)
            {
                return Result<PatientTherapist>.Failure($"Entity with PatientId {patientId} not found.");
            }
            return Result<PatientTherapist>.Success(result);
        }

        public async Task<Result<PatientTherapist>> FindByPatientAndTherapistIdAsync(Guid patientId, Guid therapistId)
        {
            var result = await context.Set<PatientTherapist>().FirstOrDefaultAsync(x => x.PatientId == patientId && x.TherapistId == therapistId);
            if (result == null)
            {
                return Result<PatientTherapist>.Failure($"Entity with PatientId {patientId} and TherapistId {therapistId} not found.");
            }
            return Result<PatientTherapist>.Success(result);
        }

        public virtual async Task<Result<PatientTherapist>> DeleteByPatientAndTherapistIdAsync(Guid patientId, Guid therapistId)
        {
            var result = await FindByPatientAndTherapistIdAsync(patientId, therapistId);
            if (result != null)
            {
                context.Set<PatientTherapist>().Remove(result.Value);
                await context.SaveChangesAsync();
                return Result<PatientTherapist>.Success(result.Value);
            }
            return Result<PatientTherapist>.Failure($"Entity with patientId {patientId} and therapistId {therapistId} not found");
        }
    }
}
