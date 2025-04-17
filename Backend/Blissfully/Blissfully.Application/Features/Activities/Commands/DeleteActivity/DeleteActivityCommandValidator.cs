using FluentValidation;

namespace Blissfully.Application.Features.Activities.Commands.DeleteActivity
{
    public class DeleteActivityCommandValidator : AbstractValidator<DeleteActivityCommand>
    {
        public DeleteActivityCommandValidator()
        {
            RuleFor(p => p.ActivityId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
