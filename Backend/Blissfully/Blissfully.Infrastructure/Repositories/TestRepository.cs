using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class TestRepository : BaseRepository<Test>, ITestRepository
    {
        public TestRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<Test>>> FindByTherapistIdAsync(Guid therapistId)
        {
            var results = await context.Set<Test>().Where(x => x.TherapistId == therapistId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<Test>>.Failure($"No entities found with TherapistId {therapistId}.");
            }
            return Result<IEnumerable<Test>>.Success(results);
        }
    }
}
