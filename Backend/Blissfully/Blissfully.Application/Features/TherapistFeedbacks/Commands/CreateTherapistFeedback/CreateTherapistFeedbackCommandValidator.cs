using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.CreateTherapistFeedback
{
    public class CreateTherapistFeedbackCommandValidator : AbstractValidator<CreateTherapistFeedbackCommand>
    {
        private readonly ITherapistFeedbackRepository repository;

        public CreateTherapistFeedbackCommandValidator(ITherapistFeedbackRepository repository)
        {
            RuleFor(e => e.Feedback)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(1000).WithMessage("{PropertyName} must not exceed 1000 characters");

            RuleFor(e => e.FeedbackDate)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .LessThanOrEqualTo(DateTime.Now).WithMessage("{PropertyName} must not be in the future");

            this.repository = repository;
        }
    }
}
