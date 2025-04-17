using Blissfully.Application.Features.TestTexts.Commands.CreateTestTexts;
using Blissfully.Application.Features.TestTexts.Commands.DeleteTestTextByTestId;
using Blissfully.Application.Features.TestTexts.Queries.GetTextsByTestId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class TestTextsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateTestTextCommandResponse>> Create(CreateTestTextCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("test/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTestId(Guid id)
        {
            var result = await Mediator.Send(new GetTextsByTestIdQuery(id));
            return Ok(result);
        }

        [HttpDelete("test/{testId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteTestTextCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.TestText);
            }
            else
            {
                return NotFound(result.TestText);
            }
        }
    }
}
