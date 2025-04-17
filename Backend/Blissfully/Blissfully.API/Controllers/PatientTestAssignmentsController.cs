using Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment;
using Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment;
using Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignmentByTestId;
using Blissfully.Application.Features.PatientTestAssignments.Commands.UpdatePatientTestAssignment;
using Blissfully.Application.Features.PatientTestAssignments.Queries.GetByPatientId;
//using Blissfully.Infrastructure.Migrations;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class PatientTestAssignmentsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreatePatientTestAssignmentCommandResponse>> Create(CreatePatientTestAssignmentCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("patient/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid id)
        {
            var result = await Mediator.Send(new GetByPatientIdTestsQuery(id));
            return Ok(result);
        }

        [HttpDelete("patient/{patientId}/test/{testId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeletePatientTestAssignmentCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.PatientTestAssignment);
            }
            else
            {
                return NotFound(result.PatientTestAssignment);
            }
        }

        [HttpDelete("test/{testId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeletePatientTestAssignmentByTestIdCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.PatientTestAssignment);
            }
            else
            {
                return NotFound(result.PatientTestAssignment);
            }
        }

        [HttpPut("patient/{patientId}/test/{testId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(UpdatePatientTestAssignmentCommand command)
        {

            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
