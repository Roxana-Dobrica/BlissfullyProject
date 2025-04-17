using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetById
{
    public class GetByIdActivityQueryHandler : IRequestHandler<GetByIdActivityQuery, ActivityDto>
    {
        private readonly IActivityRepository repository;

        public GetByIdActivityQueryHandler(IActivityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<ActivityDto> Handle(GetByIdActivityQuery request, CancellationToken cancellationToken)
        {
            var Activity = await repository.FindByIdAsync(request.Id);
            if (Activity.IsSuccess)
            {
                return new ActivityDto
                {
                    ActivityId = Activity.Value.ActivityId,
                    UserId = Activity.Value.UserId,
                    ActivityTitle = Activity.Value.ActivityTitle,
                    ActivityDescription = Activity.Value.ActivityDescription,
                    ActivityDateAdded = Activity.Value.ActivityDateAdded.Date,
                    ActivityDueDate = Activity.Value.ActivityDueDate.Date,
                    IsActivityCompleted = Activity.Value.IsActivityCompleted
                    
                };
            }
            return new ActivityDto();
        }

    }
}
