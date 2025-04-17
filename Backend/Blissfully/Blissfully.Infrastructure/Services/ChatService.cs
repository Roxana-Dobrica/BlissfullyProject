using Blissfully.Application.Features.Messages.Commands.CreateMessage;
using Blissfully.Infrastructure.Hubs;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Blissfully.Infrastructure.Services
{
    public class ChatService
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IMediator _mediator;

        public ChatService(IHubContext<ChatHub> hubContext, IMediator mediator)
        {
            _hubContext = hubContext;
            _mediator = mediator;
        }

        public async Task SendMessage(CreateMessageCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);

                if (!result.Success)
                {
                    await _hubContext.Clients.User(command.SenderId.ToString()).SendAsync("SendMessageError", result.ValidationsErrors);
                    return;
                }

                await _hubContext.Clients.Client(command.ReceiverId.ToString()).SendAsync("ReceiveMessage", command.MessageContent);
            }
            catch (Exception ex)
            {
                await _hubContext.Clients.User(command.SenderId.ToString()).SendAsync("SendMessageError", $"An error occurred: {ex.Message}");
            }
        }
    }
}
