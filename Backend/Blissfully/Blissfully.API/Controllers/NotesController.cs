using Blissfully.Application.Features.Activities.Commands.DeleteActivity;
using Blissfully.Application.Features.Notes.Commands.CreateNote;
using Blissfully.Application.Features.Notes.Commands.DeleteNote;
using Blissfully.Application.Features.Notes.Queries.GetByPatientId;
using Blissfully.Application.Features.TherapistFeedbacks.Queries.GetByPatientId;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class NotesController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateNoteCommandResponse>> Create(CreateNoteCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("patient/{patientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid patientId)
        {
            var result = await Mediator.Send(new GetByPatientIdNotesQuery(patientId));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteNoteCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.Note);
            }
            else
            {
                return NotFound(result.Note);
            }
        }
    }
}
