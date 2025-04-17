using Blissfully.Application.Features.TestQuestion.Commands.CreateTestQuestion;
using Blissfully.Application.Features.TestQuestions.Commands.DeleteTestQuestionByTestId;
using Blissfully.Application.Features.TestQuestions.Queries.GetQuestionsByTestId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class TestQuestionsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateTestQuestionCommandResponse>> Create(CreateTestQuestionCommand command)
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
            var result = await Mediator.Send(new GetQuestionsByTestIdQuery(id));
            return Ok(result);
        }

        [HttpDelete("test/{testId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteTestQuestionCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.TestQuestion);
            }
            else
            {
                return NotFound(result.TestQuestion);
            }
        }
    }
}
