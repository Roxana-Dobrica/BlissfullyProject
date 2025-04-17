using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IActivityRepository : IAsyncRepository<Activity>
    {
        Task<Result<IEnumerable<Activity>>> FindByPatientIdAsync(Guid patientId);

    }
}
