using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Activities.Commands.UpdateActivity
{
    public class UpdateActivityCommandHandler : IRequestHandler<UpdateActivityCommand, UpdateActivityCommandResponse>
    {
        private readonly IActivityRepository repository;

        public UpdateActivityCommandHandler(IActivityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<UpdateActivityCommandResponse> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateActivityCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                return new UpdateActivityCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList()
                };
            }

            var Activity = await repository.FindByIdAsync(request.ActivityId);
            if (Activity.IsSuccess)
            {

                Activity.Value.Update(request.ActivityTitle, request.ActivityDescription, request.ActivityDueDate, request.IsActivityCompleted);
                await repository.UpdateAsync(Activity.Value);
                return new UpdateActivityCommandResponse
                {
                    Success = true,
                    Activity = new UpdateActivityDto
                    {
                        ActivityId = Activity.Value.ActivityId,
                        UserId = Activity.Value.UserId,
                        ActivityTitle = Activity.Value.ActivityTitle,
                        ActivityDescription = Activity.Value.ActivityDescription,
                        ActivityDueDate = Activity.Value.ActivityDueDate,
                        IsActivityCompleted = Activity.Value.IsActivityCompleted
                    
                    }
                };
            }
            return new UpdateActivityCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string> { "Activity Not Found" }
            };
        }
    }
}
