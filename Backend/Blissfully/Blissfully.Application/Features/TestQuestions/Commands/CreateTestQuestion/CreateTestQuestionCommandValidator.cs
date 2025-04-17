using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.TestQuestion.Commands.CreateTestQuestion
{
    public class CreateTestQuestionCommandValidator : AbstractValidator<CreateTestQuestionCommand>
    {
        private readonly ITestQuestionRepository repository;

        public CreateTestQuestionCommandValidator(ITestQuestionRepository repository)
        {

            RuleFor(e => e.Question)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required");

            this.repository = repository;
        }
    }
}
