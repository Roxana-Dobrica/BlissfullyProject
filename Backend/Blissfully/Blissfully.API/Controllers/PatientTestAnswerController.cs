using Blissfully.Application.Features.PatientTestAnswer.Commands.CreatePatientTestAnswer;
using Blissfully.Application.Features.PatientTestAnswer.Commands.DeletePatientTestAnswer;
using Blissfully.Application.Features.PatientTestAnswer.Queries.GetByPatientAndTestId;
using Blissfully.Application.Features.PatientTherapist.Queries.GetByTherapistId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class PatientTestAnswerController : ApiControllerBase
    {

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreatePatientTestAnswerCommandResponse>> Create(CreatePatientTestAnswerCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpDelete("test/{testId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeletePatientTestAnswerCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.PatientTestAnswer);
            }
            else
            {
                return NotFound(result.PatientTestAnswer);
            }
        }

        [HttpGet("patient/{patientId}/test/{testId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientAndTestId(Guid patientId, Guid testId)
        {
            var result = await Mediator.Send(new GetAnswersByPatientAndTestIdQuery(patientId, testId));
            return Ok(result);
        }
    }
}
