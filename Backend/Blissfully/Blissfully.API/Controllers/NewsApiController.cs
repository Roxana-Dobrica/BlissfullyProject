using Blissfully.Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class NewsApiController : ControllerBase
    {
        private readonly INewsService newsService;

        public NewsApiController(INewsService newsService)
        {
            this.newsService = newsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            try
            {
                var articles = await newsService.GetArticlesAsync();
                return Ok(articles);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
