using Blissfully.Application.Features.Materials.Commands.CreateMaterial;
using Blissfully.Application.Features.Materials.Commands.DeleteMaterial;
using Blissfully.Application.Features.Materials.Commands.UpdateMaterial;
using Blissfully.Application.Features.Materials.Queries.GetAll;
using Blissfully.Application.Features.Materials.Queries.GetByPatientIdAndType;
using Blissfully.Domain.Common;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class MaterialsController : ApiControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateMaterialCommandResponse>> Create(CreateMaterialCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(DeleteMaterialCommand command)
        {
            var result = await Mediator.Send(command);

            if (result.Success)
            {
                return Ok(result.Material);
            }
            else
            {
                return NotFound(result.Material);
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetAllMaterialsQuery());
            return Ok(result);
        }

        [HttpGet("patient/{patientId}/type/{type}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPatientIdAndType(Guid patientId, MaterialCategory type)
        {
            var result = await Mediator.Send(new GetByPatientIdAndTypeMaterialQuery(patientId, type));
            return Ok(result);
        }

        /*
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await Mediator.Send(new GetByIdMaterialQuery(id));
            return Ok(result);
        }*/

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(Guid id, UpdateMaterialCommand command)
        {
            if (id != command.MaterialId)
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
