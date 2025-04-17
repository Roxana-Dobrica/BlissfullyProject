namespace Blissfully.Application.Contracts
{
    public interface IOpenAiService
    {
        Task<string> GetChatCompletionsAsync(string userMessage);
    }
}
