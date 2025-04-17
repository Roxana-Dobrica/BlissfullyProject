using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.TestTexts.Commands.CreateTestTexts
{
    public class CreateTestTextCommandValidator : AbstractValidator<CreateTestTextCommand>
    {
        private readonly ITestTextRepository repository;

        public CreateTestTextCommandValidator(ITestTextRepository repository)
        {

            RuleFor(e => e.Text)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required");

            this.repository = repository;
        }
    }
}
