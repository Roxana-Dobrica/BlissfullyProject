using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IPatientTherapistRepository : IAsyncRepository<PatientTherapist>
    {
        Task<Result<IEnumerable<PatientTherapist>>> FindByTherapistIdAsync(Guid id);
        Task<Result<PatientTherapist>> FindByPatientIdAsync(Guid id);
        Task<Result<PatientTherapist>> FindByPatientAndTherapistIdAsync(Guid patientId, Guid testId);
        Task<Result<PatientTherapist>> DeleteByPatientAndTherapistIdAsync(Guid patientId, Guid testId);
    }
}
