using FluentValidation;

namespace Blissfully.Application.Features.Activities.Commands.UpdateActivity
{
    public class UpdateActivityCommandValidator : AbstractValidator<UpdateActivityCommand>
    {
        public UpdateActivityCommandValidator() 
        {

            RuleFor(e => e.ActivityTitle)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters");

            RuleFor(e => e.ActivityDueDate)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .GreaterThanOrEqualTo(DateTime.Now.Date).WithMessage("{PropertyName} must be greater than or equal to current date");
        }

    }
}
