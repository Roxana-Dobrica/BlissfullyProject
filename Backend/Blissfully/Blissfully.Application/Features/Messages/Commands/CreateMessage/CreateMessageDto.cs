namespace Blissfully.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageDto
    {
        public Guid SenderId { get; set; } 
        public Guid ReceiverId { get; set; } 
        public string MessageContent { get; set; } = string.Empty;
        public DateTime MessageTime { get; set; }
    }
}
