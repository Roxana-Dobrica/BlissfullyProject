using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class NoteRepository : BaseRepository<Note>, INoteRepository
    {
        public NoteRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<Note>>> FindByPatientIdAsync(Guid patientId)
        {
            var result = await context.Set<Note>().Where(x => x.PatientId == patientId).ToListAsync();
            if (result == null || !result.Any())
            {
                return Result<IEnumerable<Note>>.Failure($"Entity with PatientId {patientId} not found.");
            }
            return Result<IEnumerable<Note>>.Success(result);
        }

    }
}
