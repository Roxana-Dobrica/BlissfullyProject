using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IPatientTestAssignmentRepository : IAsyncRepository<PatientTestAssignment>
    {
        Task<Result<IEnumerable<PatientTestAssignment>>> FindByPatientIdAsync(Guid id);
        Task<Result<PatientTestAssignment>> FindByPatientAndTestIdAsync(Guid patientId, Guid testId);
        Task<Result<IEnumerable<PatientTestAssignment>>> FindByTestIdAsync(Guid testId);
        Task<Result<PatientTestAssignment>> DeleteByPatientAndTestIdAsync(Guid patientId, Guid testId);
        Task<Result<IEnumerable<PatientTestAssignment>>> DeleteByTestIdAsync(Guid testId);
    }
}
