using FluentValidation;

namespace Blissfully.Application.Features.TestQuestions.Commands.DeleteTestQuestionByTestId
{
    public class DeleteTestQuestionCommandValidator : AbstractValidator<DeleteTestQuestionCommand>
    {
        public DeleteTestQuestionCommandValidator()
        {
            RuleFor(p => p.TestId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
