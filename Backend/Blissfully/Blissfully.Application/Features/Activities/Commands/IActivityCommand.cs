namespace Blissfully.Application.Features.Activities.Commands
{
    public class IActivityCommand
    {
        public Guid UserId { get; set; }
        public string ActivityTitle { get; set; } = string.Empty;
        public string? ActivityDescription { get; set; }
        public DateTime ActivityDateAdded { get; set; }
        public DateTime ActivityDueDate { get; set; }
        public bool IsActivityCompleted { get; set; } = false;
    }
}
