using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TherapistFeedbacks.Queries.GetByPatientId
{
    public class GetByPatientIdFeedbackQueryHandler : IRequestHandler<GetByPatientIdFeedbackQuery, GetByPatientIdFeedbackQueryResponse>
    {
        private readonly ITherapistFeedbackRepository repository;

        public GetByPatientIdFeedbackQueryHandler(ITherapistFeedbackRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetByPatientIdFeedbackQueryResponse> Handle(GetByPatientIdFeedbackQuery request, CancellationToken cancellationToken)
        {
            GetByPatientIdFeedbackQueryResponse response = new();
            var result = await repository.FindByPatientIdAsync(request.patientId);
            if (result.IsSuccess)
            {
                response.TherapistFeedbacks = result.Value.Select(a => new TherapistFeedbackDto
                {
                    TherapistFeedbackId = a.TherapistFeedbackId,
                    TherapistId = a.TherapistId,
                    UserId = a.UserId,
                    Feedback = a.Feedback,
                    FeedbackDate = a.FeedbackDate.Date
                }).ToList();
            }
            return response;
        }
    }
}
