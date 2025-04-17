using Blissfully.Application.Features.Appointments.Commands.CreateAppointment;
using Blissfully.Application.Features.Appointments.Commands.DeleteAppointment;
using Blissfully.Application.Features.Appointments.Queries.GetByPatientId;
using Blissfully.Application.Features.Appointments.Queries.GetByTherapistId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class AppointmentsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateAppointmentCommandResponse>> Create(CreateAppointmentCommand command)
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
            var result = await Mediator.Send(new GetAppointmentByTherapistIdQuery(id));
            return Ok(result);
        }

        [HttpGet("patient/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid id)
        {
            var result = await Mediator.Send(new GetAppointmentByPatientIdQuery(id));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteAppointmentCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.Appointment);
            }
            else
            {
                return NotFound(result.Appointment);
            }
        }
    }
}
