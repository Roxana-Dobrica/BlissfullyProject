using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IPatientTestAnswerRepository : IAsyncRepository<PatientTestAnswer>
    {
        Task<Result<IEnumerable<PatientTestAnswer>>> FindByTestIdAsync(Guid id);
        Task<Result<IEnumerable<PatientTestAnswer>>> FindByPatientAndTestIdAsync(Guid patientId, Guid testId);
        Task<Result<IEnumerable<PatientTestAnswer>>> DeleteByTestIdAsync(Guid id);
    }
}
