using Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment;
using Blissfully.Application.Features.PatientTherapist.Commands.CreatePatientTherapist;
using Blissfully.Application.Features.PatientTherapist.Commands.DeletePatientTherapist;
using Blissfully.Application.Features.PatientTherapist.Queries.GetAll;
using Blissfully.Application.Features.PatientTherapist.Queries.GetByPatientId;
using Blissfully.Application.Features.PatientTherapist.Queries.GetByTherapistId;
using Blissfully.Application.Features.TherapistFeedbacks.Queries.GetAll;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class PatientTherapistController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreatePatientTherapistCommandResponse>> Create(CreatePatientTherapistCommand command)
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
            var result = await Mediator.Send(new GetAllPatientsTherapistsQuery());
            return Ok(result);
        }

        [HttpGet("therapist/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTherapistId(Guid id)
        {
            var result = await Mediator.Send(new GetByTherapistIdQuery(id));
            return Ok(result);
        }

        [HttpGet("patient/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid id)
        {
            var result = await Mediator.Send(new GetByPatientIdQuery(id));
            return Ok(result);
        }


        [HttpDelete("patient/{patientId}/therapist/{therapistId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeletePatientTherapistCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.PatientTherapist);
            }
            else
            {
                return NotFound(result.PatientTherapist);
            }
        }

    }
}
