using MediatR;

namespace Blissfully.Application.Features.TherapistFeedbacks.Queries.GetByPatientId
{
    public class GetByPatientIdFeedbackQuery : IRequest<GetByPatientIdFeedbackQueryResponse>
    {
        public GetByPatientIdFeedbackQuery(Guid patientId)
        {
            this.patientId = patientId;
        }

        public Guid patientId { get; set; }
    }
}
