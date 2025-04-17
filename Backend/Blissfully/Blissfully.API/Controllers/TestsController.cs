using Blissfully.Application.Features.Tests.Commands.CreateTest;
using Blissfully.Application.Features.Tests.Commands.DeleteTest;
using Blissfully.Application.Features.Tests.Queries.GetById;
using Blissfully.Application.Features.Tests.Queries.GetByTherapistId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class TestsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateTestCommandResponse>> Create(CreateTestCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("therapist/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTherapistId(Guid id)
        {
            var result = await Mediator.Send(new GetByTherapistIdTestQuery(id));
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Mediator.Send(new GetByIdTestQuery(id));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteTestCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.Test);
            }
            else
            {
                return NotFound(result.Test);
            }
        }

    }
}
