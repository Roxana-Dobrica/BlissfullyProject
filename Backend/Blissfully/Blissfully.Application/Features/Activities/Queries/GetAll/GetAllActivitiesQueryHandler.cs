using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetAll
{
    public class GetAllActivitiesQueryHandler : IRequestHandler<GetAllActivitiesQuery, GetAllActivitiesQueryResponse>
    {
        private readonly IActivityRepository repository;

        public GetAllActivitiesQueryHandler(IActivityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetAllActivitiesQueryResponse> Handle(GetAllActivitiesQuery request, CancellationToken cancellationToken)
        {
            GetAllActivitiesQueryResponse response = new();
            var result = await repository.GetAllAsync();
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
