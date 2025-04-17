using Blissfully.Application.Persistence;
using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blissfully.Infrastructure.Repositories
{
    public class TestQuestionRepository : BaseRepository<TestQuestion>, ITestQuestionRepository
    {
        public TestQuestionRepository(BlissfullyContext context) : base(context)
        {
        }

        public virtual async Task<Result<IEnumerable<TestQuestion>>> FindByTestIdAsync(Guid testId)
        {
            var results = await context.Set<TestQuestion>().Where(x => x.TestId == testId).ToListAsync();
            if (results == null || !results.Any())
            {
                return Result<IEnumerable<TestQuestion>>.Failure($"No entities found with TestId {testId}.");
            }
            return Result<IEnumerable<TestQuestion>>.Success(results);
        }

        public virtual async Task<Result<IEnumerable<TestQuestion>>> DeleteByTestIdAsync(Guid testId)
        {
            var result = await FindByTestIdAsync(testId);
            if (result != null && result.IsSuccess && result.Value.Any())
            {
                context.Set<TestQuestion>().RemoveRange(result.Value);
                await context.SaveChangesAsync();
                return Result<IEnumerable<TestQuestion>>.Success(result.Value);
            }
            return Result<IEnumerable<TestQuestion>>.Failure($"Entities with testId {testId} not found");
        }
    }
}
