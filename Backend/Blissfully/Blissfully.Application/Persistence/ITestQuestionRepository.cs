using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface ITestQuestionRepository : IAsyncRepository<TestQuestion>
    {
        Task<Result<IEnumerable<TestQuestion>>> FindByTestIdAsync(Guid id);
        Task<Result<IEnumerable<TestQuestion>>> DeleteByTestIdAsync(Guid id);
    }
}
