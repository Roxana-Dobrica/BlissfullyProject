using Blissfully.Application.Features.Messages.Commands.CreateMessage;
using Microsoft.AspNetCore.Mvc;

namespace Blissfully.API.Controllers
{
    public class MessagesController : ApiControllerBase
    {

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateMessageCommandResponse>> Create(CreateMessageCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
