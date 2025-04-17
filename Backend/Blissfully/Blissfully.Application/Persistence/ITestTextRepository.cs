using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface ITestTextRepository : IAsyncRepository<TestText>
    {
        Task<Result<IEnumerable<TestText>>> FindByTestIdAsync(Guid id);
        Task<Result<IEnumerable<TestText>>> DeleteByTestIdAsync(Guid id);
    }
}
