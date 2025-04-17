using Blissfully.Application.Features.Activities.Commands.CreateActivity;
using Blissfully.Application.Features.Activities.Commands.DeleteActivity;
using Blissfully.Application.Features.Activities.Commands.UpdateActivity;
using Blissfully.Application.Features.Activities.Queries.GetAll;
using Blissfully.Application.Features.Activities.Queries.GetById;
using Blissfully.Application.Features.Activities.Queries.GetByPatientId;
using Blissfully.Application.Features.Activities.Queries.GetPaged;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Blissfully.API.Controllers
{
    public class ActivitiesController : ApiControllerBase
    {
        //[Authorize(Roles = "Therapist")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateActivityCommandResponse>> Create(CreateActivityCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        //[Authorize(Roles = "Therapist")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteActivityCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.Activity);
            }
            else
            {
                return NotFound(result.Activity);
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetAllActivitiesQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Mediator.Send(new GetByIdActivityQuery(id));
            return Ok(result);
        }

        [HttpGet("patient/{patientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientId(Guid patientId)
        {
            var result = await Mediator.Send(new GetByPatientIdActivityQuery(patientId));
            return Ok(result);
        }

        [HttpGet("paged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPaged(
        [SwaggerParameter("Current page: ")] int? page = null,
        [SwaggerParameter("Number of elements: ")] int? size = null)
        {
            var result = await Mediator.Send(new GetPagedActivitiesQuery { Page = page ?? 1, Size = size ?? 10 });
            return Ok(result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(Guid id, UpdateActivityCommand command)
        {
            if (id != command.ActivityId)
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
    }
}
