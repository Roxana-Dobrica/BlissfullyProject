using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Activities.Commands.DeleteActivity
{
    public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommand, DeleteActivityCommandResponse>
    {
        private readonly IActivityRepository repository;
        public DeleteActivityCommandHandler(IActivityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteActivityCommandResponse> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteActivityCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteActivityCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    Activity = new DeleteActivityDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var Activity = await repository.FindByIdAsync(request.ActivityId);
            if (Activity.IsSuccess)
            {
                await repository.DeleteAsync(request.ActivityId);
                return new DeleteActivityCommandResponse
                {
                    Success = true,
                    Activity = new DeleteActivityDto
                    {
                        response = "Activity Deleted Successfully"
                    }
                };
            }
            return new DeleteActivityCommandResponse
            {
                Success = false,
                Activity = new DeleteActivityDto
                {
                    response = "Activity Not Found"
                }
            };
        }
    }
}
