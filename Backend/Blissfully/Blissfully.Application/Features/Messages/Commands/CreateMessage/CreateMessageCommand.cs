using MediatR;

namespace Blissfully.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageCommand : IMessageCommand, IRequest<CreateMessageCommandResponse>
    {
    }
}
