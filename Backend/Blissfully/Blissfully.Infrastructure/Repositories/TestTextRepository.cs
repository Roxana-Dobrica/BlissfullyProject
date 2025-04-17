using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class TestTextRepository : BaseRepository<TestText>, ITestTextRepository
    {
        public TestTextRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<TestText>>> FindByTestIdAsync(Guid testId)
        {
            var results = await context.Set<TestText>().Where(x => x.TestId == testId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<TestText>>.Failure($"No entities found with TestId {testId}.");
            }
            return Result<IEnumerable<TestText>>.Success(results);
        }

        public virtual async Task<Result<IEnumerable<TestText>>> DeleteByTestIdAsync(Guid testId)
        {
            var result = await FindByTestIdAsync(testId);
            if (result != null && result.IsSuccess && result.Value.Any())
            {
                context.Set<TestText>().RemoveRange(result.Value);
                await context.SaveChangesAsync();
                return Result<IEnumerable<TestText>>.Success(result.Value);
            }
            return Result<IEnumerable<TestText>>.Failure($"Entities with testId {testId} not found");
        }
    }
}
