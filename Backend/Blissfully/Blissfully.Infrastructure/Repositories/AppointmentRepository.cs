using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class AppointmentRepository : BaseRepository<Appointment>, IAppointmentRepository
    {
        public AppointmentRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<Appointment>>> FindByPatientIdAsync(Guid patientId)
        {
            var results = await context.Set<Appointment>().Where(x => x.PatientId == patientId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<Appointment>>.Failure($"Entity with PatientId {patientId} not found.");
            }
            return Result<IEnumerable<Appointment>>.Success(results);
        }

        public virtual async Task<Result<IEnumerable<Appointment>>> FindByTherapistIdAsync(Guid therapistId)
        {
            var results = await context.Set<Appointment>().Where(x => x.TherapistId == therapistId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<Appointment>>.Failure($"No entities found with TherapistId {therapistId}.");
            }
            return Result<IEnumerable<Appointment>>.Success(results);
        }
    }
}
