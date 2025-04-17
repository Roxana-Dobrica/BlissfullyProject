using Blissfully.Application.Features.JournalEntries.Commands.CreateJournalEntry;
using Blissfully.Application.Features.JournalEntries.Commands.DeleteJournalEntry;
using Blissfully.Application.Features.JournalEntries.Commands.UpdateJournalEntry;
using Blissfully.Application.Features.JournalEntries.Queries.GetAll;
using Blissfully.Application.Features.JournalEntries.Queries.GetById;
using Blissfully.Application.Features.JournalEntries.Queries.GetByPatientId;
using Blissfully.Application.Features.JournalEntries.Queries.GetFeelingsByPatientId;
using Blissfully.Application.Features.JournalEntries.Queries.GetPaged;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Blissfully.API.Controllers
{
    public class JournalEntriesController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateJournalEntryCommandResponse>> Create(CreateJournalEntryCommand command)
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
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetAllJournalEntriesQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Mediator.Send(new GetByIdJournalEntryQuery(id));
            return Ok(result);
        }

        [HttpGet("paged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPaged(
        [SwaggerParameter("Current page: ")] int? page = null,
        [SwaggerParameter("Number of elements: ")] int? size = null)
        {
            var result = await Mediator.Send(new GetPagedJournalEntriesQuery { Page = page ?? 1, Size = size ?? 10 });
            return Ok(result);
        }

        [HttpGet("patient/{patientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid patientId)
        {
            var result = await Mediator.Send(new GetByPatientIdJournalEntryQuery(patientId));
            return Ok(result);
        }

        [HttpGet("patient/{patientId}/feelings")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFeelingsByPatientId(Guid patientId)
        {
            var result = await Mediator.Send(new GetFeelingsByPatientIdQuery(patientId));
            return Ok(result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(Guid id, UpdateJournalEntryCommand command)
        {
            if (id != command.JournalEntryId)
            {
                return BadRequest("The provided ID in the URL does not match the ID in the request body.");
            }

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

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteJournalEntryCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.JournalEntry);
            }
            else
            {
                return NotFound(result.JournalEntry);
            }
        }
    }
}
