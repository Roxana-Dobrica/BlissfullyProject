namespace Blissfully.Application.Features.TherapistFeedbacks.Queries.GetByPatientId
{
    public class GetByPatientIdFeedbackQueryResponse
    {
        public List<TherapistFeedbackDto> TherapistFeedbacks { get; set; } = default!;
    }
}
