namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.CreateTherapistFeedback
{
    public class CreateTherapistFeedbackDto
    {
        public Guid TherapistFeedbackId { get; set; }
        public Guid TherapistId { get; set; }
        public Guid UserId { get; set; }
        public string Feedback { get; set; } = string.Empty;
        public DateTime FeedbackDate { get; set; }
    }
}
