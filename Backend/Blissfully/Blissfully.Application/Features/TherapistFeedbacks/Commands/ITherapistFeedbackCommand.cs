namespace Blissfully.Application.Features.TherapistFeedbacks.Commands
{
    public class ITherapistFeedbackCommand
    {
        public Guid TherapistId { get; set; }
        public Guid UserId { get; set; }
        public string Feedback { get; set; } = string.Empty;
        public DateTime FeedbackDate { get; set; }
    }
}
