using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetPaged
{
    public class GetPagedActivitiesQueryHandler : IRequestHandler<GetPagedActivitiesQuery, GetPagedActivitiesQueryResponse>
    {
        private readonly IActivityRepository repository;

        public GetPagedActivitiesQueryHandler(IActivityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetPagedActivitiesQueryResponse> Handle(GetPagedActivitiesQuery request, CancellationToken cancellationToken)
        {
            GetPagedActivitiesQueryResponse response = new();
            var result = await repository.GetPagedResponseAsync(request.Page, request.Size);
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
