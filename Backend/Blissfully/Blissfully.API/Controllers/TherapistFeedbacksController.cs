using Blissfully.Application.Features.TherapistFeedbacks.Commands.CreateTherapistFeedback;
using Blissfully.Application.Features.TherapistFeedbacks.Commands.DeleteTherapistFeedback;
using Blissfully.Application.Features.TherapistFeedbacks.Queries.GetAll;
using Blissfully.Application.Features.TherapistFeedbacks.Queries.GetByPatientId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class TherapistFeedbacksController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateTherapistFeedbackCommandResponse>> Create(CreateTherapistFeedbackCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetAllTherapistFeedbacksQueryResponse>> GetAll()
        {
            var result = await Mediator.Send(new GetAllTherapistFeedbacksQuery());
            return Ok(result);
        }

        [HttpGet("patient/{patientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid patientId)
        {
            var result = await Mediator.Send(new GetByPatientIdFeedbackQuery(patientId));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteTherapistFeedbackCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.TherapistFeedback);
            }
            else
            {
                return NotFound(result.TherapistFeedback);
            }
        }
    }
}
