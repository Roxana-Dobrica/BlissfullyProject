using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class JournalEntryRepository : BaseRepository<JournalEntry>, IJournalEntryRepository
    {
        public JournalEntryRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<JournalEntry>>> FindByPatientIdAsync(Guid patientId)
        {
            var results = await context.Set<JournalEntry>().Where(x => x.UserId == patientId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<JournalEntry>>.Failure($"Entity with PatientId {patientId} not found.");
            }
            return Result<IEnumerable<JournalEntry>>.Success(results);
        }
    }
}
