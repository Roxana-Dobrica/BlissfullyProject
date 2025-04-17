using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Blissfully.Application.Contracts;
using Blissfully.Application.Models;
using Microsoft.Extensions.Options;

namespace Blissfully.Infrastructure.Services
{
    public class OpenAiService : IOpenAiService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly OpenAiSettings _openAiSettings;

        public OpenAiService(IHttpClientFactory clientFactory, IOptions<OpenAiSettings> openAiSettings)
        {
            _clientFactory = clientFactory;
            _openAiSettings = openAiSettings.Value;
        }

        public async Task<string> GetChatCompletionsAsync(string userMessage)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _openAiSettings.ApiKey);

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://api.openai.com/v1/chat/completions"),
                Content = new StringContent(JsonSerializer.Serialize(new
                {
                    model = "gpt-3.5-turbo",
                    messages = new object[]
                    {
                        new { role = "system", content = "You are a helpful assistant of a Web application that is dedicated to therapists and their patients who suffer from anxiety and stress. Your name is BuddyBot and you need to answer to the questions asked by them and to try to help them with what they need or to give them advices. But I would like you not to insist too much on the fact that the respective patient has anxiety and stress, but to be more like a friend to him, not to use these words excessively" },
                        new { role = "user", content = userMessage }
                    }
                }), Encoding.UTF8, "application/json"),
            };

            var response = await client.SendAsync(request);

            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
