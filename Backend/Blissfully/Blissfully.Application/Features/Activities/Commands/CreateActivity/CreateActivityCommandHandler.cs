using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.Activities.Commands.CreateActivity
{
    public class CreateActivityCommandHandler : IRequestHandler<CreateActivityCommand, CreateActivityCommandResponse>
    {
        private readonly IActivityRepository activityRepository;
        private readonly ILogger<CreateActivityCommandHandler> logger;

        public CreateActivityCommandHandler(IActivityRepository activityRepository, ILogger<CreateActivityCommandHandler> logger)
        {
            this.activityRepository = activityRepository;
            this.logger = logger;
        }

        public async Task<CreateActivityCommandResponse> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateActivityCommandValidator(activityRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if(!validatorResult.IsValid)
            {
                return new CreateActivityCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var activity = Activity.Create(request.UserId, request.ActivityTitle, request.ActivityDueDate);
            if (activity.IsSuccess)
            {
#pragma warning disable CS8604 // Possible null reference argument.
                activity.Value.AttachDescription(request.ActivityDescription);
                var result = activityRepository.AddAsync(activity.Value);
                return new CreateActivityCommandResponse()
                {
                    Success = true,
                    Activity = new CreateActivityDto()
                    {
                        ActivityId = activity.Value.ActivityId,
                        UserId = activity.Value.UserId,
                        ActivityTitle = activity.Value.ActivityTitle,
                        ActivityDescription = activity.Value.ActivityDescription,
                        ActivityDateAdded = activity.Value.ActivityDateAdded.Date,
                        ActivityDueDate = activity.Value.ActivityDueDate.Date
                    }
                };
            }
            return new CreateActivityCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { activity.Error }
            };
        }
    }
}
