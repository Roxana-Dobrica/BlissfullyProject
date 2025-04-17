using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetByPatientId
{
    public class GetByPatientIdActivityQueryHandler : IRequestHandler<GetByPatientIdActivityQuery, GetByPatientIdActivityQueryResponse>
    {
        private readonly IActivityRepository repository;

        public GetByPatientIdActivityQueryHandler(IActivityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetByPatientIdActivityQueryResponse> Handle(GetByPatientIdActivityQuery request, CancellationToken cancellationToken)
        {
            GetByPatientIdActivityQueryResponse response = new();
            var result = await repository.FindByPatientIdAsync(request.patientId);
            if (result.IsSuccess)
            {
                response.Activities = result.Value.Select(a => new ActivityDto
                {
                    ActivityId = a.ActivityId,
                    UserId = a.UserId,
                    ActivityTitle = a.ActivityTitle,
                    ActivityDescription = a.ActivityDescription,
                    ActivityDateAdded = a.ActivityDateAdded.Date,
                    ActivityDueDate = a.ActivityDueDate.Date,
                    IsActivityCompleted = a.IsActivityCompleted
                }).ToList();
            }
            return response;
        }
    }
}
