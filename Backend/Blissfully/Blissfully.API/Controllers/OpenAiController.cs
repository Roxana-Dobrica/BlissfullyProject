using Blissfully.Application.Contracts;
using Blissfully.Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]

    public class OpenAIController : ControllerBase
    {
        private readonly IOpenAiService openAiService;

        public OpenAIController(IOpenAiService openAIService)
        {
            this.openAiService = openAIService;
        }

        [HttpPost("chat/completions")]
        public async Task<IActionResult> GetChatCompletions(AIRequestModel model)
        {
            try
            {
                var result = await openAiService.GetChatCompletionsAsync(model.AIRequest);
                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
