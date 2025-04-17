using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TherapistFeedbacks.Queries.GetAll
{
    public class GetAllTherapistFeedbacksQueryHandler : IRequestHandler<GetAllTherapistFeedbacksQuery, GetAllTherapistFeedbacksQueryResponse>
    {
        private readonly ITherapistFeedbackRepository repository;
        public GetAllTherapistFeedbacksQueryHandler(ITherapistFeedbackRepository repository)
        {
            this.repository = repository;
        }
        public async Task<GetAllTherapistFeedbacksQueryResponse> Handle(GetAllTherapistFeedbacksQuery request, CancellationToken cancellationToken)
        {
            GetAllTherapistFeedbacksQueryResponse response = new();
            var result = await repository.GetAllAsync();
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
