using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.Tests.Commands.CreateTest
{
    public class CreateTestCommandValidator : AbstractValidator<CreateTestCommand>
    {
        private readonly ITestRepository repository;

        public CreateTestCommandValidator(ITestRepository repository)
        {

            RuleFor(e => e.TestTitle)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(500).WithMessage("{PropertyName} must not exceed 500 characters");

            this.repository = repository;
        }
    }
}
