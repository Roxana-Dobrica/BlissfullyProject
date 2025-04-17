using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.Activities.Commands.CreateActivity
{
    public class CreateActivityCommandValidator : AbstractValidator<CreateActivityCommand>
    {
        private readonly IActivityRepository repository;

        public CreateActivityCommandValidator(IActivityRepository repository)
        {
            RuleFor(e => e.ActivityTitle)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters");

            RuleFor(e => e.ActivityDueDate)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .GreaterThanOrEqualTo(DateTime.Now.Date).WithMessage("{PropertyName} must be greater than or equal to current date");

            this.repository = repository;
        }
    }
}
