using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface ITherapistFeedbackRepository : IAsyncRepository<TherapistFeedback>
    {
        Task<Result<IEnumerable<TherapistFeedback>>> FindByPatientIdAsync(Guid patientId);
    }
}
