using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface IJournalEntryRepository : IAsyncRepository<JournalEntry>
    {
        Task<Result<IEnumerable<JournalEntry>>> FindByPatientIdAsync(Guid patientId);
    }
}
