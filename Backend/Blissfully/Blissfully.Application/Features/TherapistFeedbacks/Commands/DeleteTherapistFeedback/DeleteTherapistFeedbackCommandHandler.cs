using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.DeleteTherapistFeedback
{
    public class DeleteTherapistFeedbackCommandHandler : IRequestHandler<DeleteTherapistFeedbackCommand, DeleteTherapistFeedbackCommandResponse>
    {
        private readonly ITherapistFeedbackRepository repository;
        public DeleteTherapistFeedbackCommandHandler(ITherapistFeedbackRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteTherapistFeedbackCommandResponse> Handle(DeleteTherapistFeedbackCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteTherapistFeedbackCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                return new DeleteTherapistFeedbackCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    TherapistFeedback = new DeleteTherapistFeedbackDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var TherapistFeedback = await repository.FindByIdAsync(request.TherapistFeedbackId);
            if (TherapistFeedback.IsSuccess)
            {
                await repository.DeleteAsync(request.TherapistFeedbackId);
                return new DeleteTherapistFeedbackCommandResponse
                {
                    Success = true,
                    TherapistFeedback = new DeleteTherapistFeedbackDto
                    {
                        response = "Therapist Feedback Deleted Successfully"
                    }
                };
            }
            return new DeleteTherapistFeedbackCommandResponse
            {
                Success = false,
                TherapistFeedback = new DeleteTherapistFeedbackDto
                {
                    response = "Therapist Feedback Not Found"
                }
            };
        }
    }
}
