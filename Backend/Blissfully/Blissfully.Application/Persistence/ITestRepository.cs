using Blissfully.Domain.Common;
using Blissfully.Domain.Entities;

namespace Blissfully.Application.Persistence
{
    public interface ITestRepository : IAsyncRepository<Test>
    {
        Task<Result<IEnumerable<Test>>> FindByTherapistIdAsync(Guid id);
    }
}
