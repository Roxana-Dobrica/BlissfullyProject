using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageCommandResponse : BaseResponse
    {
        public CreateMessageCommandResponse() : base()
        {
        }

        public CreateMessageDto Message { get; set; }
    }
}
