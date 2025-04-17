namespace Blissfully.Application.Features
{
    public class ActivityDto
    {
        public Guid ActivityId { get; set; } = default!;
        public Guid UserId { get; set; } = default!;
        public string ActivityTitle { get; set; } = string.Empty;
        public string? ActivityDescription { get; set; }
        public DateTime ActivityDateAdded { get; set; }
        public DateTime ActivityDueDate { get; set; }
        public bool IsActivityCompleted { get; set; } = false;

    }
}
