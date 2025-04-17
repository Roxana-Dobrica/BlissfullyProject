using NewsAPI.Models;

namespace Blissfully.Application.Contracts
{
    public interface INewsService
    {
        Task<IEnumerable<Article>> GetArticlesAsync();
    }
}
