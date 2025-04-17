using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface INoteRepository : IAsyncRepository<Note>
    {
        Task<Result<IEnumerable<Note>>> FindByPatientIdAsync(Guid patientId);
    }
}
