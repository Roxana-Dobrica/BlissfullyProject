namespace Blissfully.Application.Features.Messages.Commands
{
    public class IMessageCommand
    {
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string MessageContent { get; set; } = string.Empty;
        public DateTime MessageTime { get; set; }
    }
}
