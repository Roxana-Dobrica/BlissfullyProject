using NewsAPI;
using Blissfully.Application.Contracts;
using NewsAPI.Models;
using Blissfully.Application.Models;
using Microsoft.Extensions.Options;

namespace Blissfully.Infrastructure.Services
{
    public class NewsService : INewsService
    {
        private readonly NewsApiClient _newsApiClient;
        private string _newsApiKey;

        public NewsService(IOptions<NewsSettings> newsSettings)
        {
            _newsApiKey = newsSettings.Value.NewsApiKey;
            _newsApiClient = new NewsApiClient(_newsApiKey);
        }

        public async Task<IEnumerable<Article>> GetArticlesAsync()
        {
            try
            {
                var articlesResponse = await _newsApiClient.GetEverythingAsync(new NewsAPI.Models.EverythingRequest
                {
                    Q = "psychotherapy",
                    Language = NewsAPI.Constants.Languages.EN,
                    SortBy = NewsAPI.Constants.SortBys.Popularity,
                    From = DateTime.Now.AddDays(-7),
                    Domains = new List<string> { "https://nytimes.com", "https://psychologytoday.com", "https://verywellmind.com", "https://mindful.org", "https://psychcentral.com", "https://themighty.com", "https://apa.org", "https://health.harvard.edu", "https://helpguide.org", "https://nimh.nih.gov", "https://mhanational.org", "https://bbc.com" }
                });

                if (articlesResponse.Status == NewsAPI.Constants.Statuses.Ok)
                {
                    return articlesResponse.Articles;
                }
                else
                {
                    throw new Exception(articlesResponse.Error.Message);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching news articles", ex);
            }
        }
    }
}

