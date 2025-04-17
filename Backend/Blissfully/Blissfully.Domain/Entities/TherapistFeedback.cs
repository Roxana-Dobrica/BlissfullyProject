using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class TherapistFeedback : AuditableEntity
    {
        private TherapistFeedback(Guid therapistId, Guid userId, string feedback, DateTime feedbackDate)
        {
            TherapistFeedbackId = Guid.NewGuid();
            TherapistId = therapistId;
            UserId = userId;
            Feedback = feedback;
            FeedbackDate = feedbackDate;
        }
        public Guid TherapistFeedbackId { get; private set; }
        public Guid TherapistId { get; private set; }
        public Guid UserId { get; private set; }
        public string Feedback { get; private set; } = string.Empty;
        public DateTime FeedbackDate { get; private set; }

        public static Result<TherapistFeedback> Create(Guid therapistId, Guid userId, string feedback, DateTime feedbackDate)
        {
            if (string.IsNullOrWhiteSpace(feedback))
            {
                return Result<TherapistFeedback>.Failure("Feedback is required");
            }
            return Result<TherapistFeedback>.Success(new TherapistFeedback(therapistId, userId, feedback, feedbackDate));
        }
    }
}
