using FluentValidation;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.DeleteTherapistFeedback
{
    public class DeleteTherapistFeedbackCommandValidator : AbstractValidator<DeleteTherapistFeedbackCommand>
    {
        public DeleteTherapistFeedbackCommandValidator()
        {
            RuleFor(p => p.TherapistFeedbackId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
