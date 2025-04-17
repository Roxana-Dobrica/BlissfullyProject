using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IAppointmentRepository : IAsyncRepository<Appointment>
    {
        Task<Result<IEnumerable<Appointment>>> FindByPatientIdAsync(Guid patientId);
        Task<Result<IEnumerable<Appointment>>> FindByTherapistIdAsync(Guid therapistId);
    }
}
