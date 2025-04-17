using FluentValidation;

namespace Blissfully.Application.Features.TestTexts.Commands.DeleteTestTextByTestId
{
    internal class DeleteTestTextCommandValidator : AbstractValidator<DeleteTestTextCommand>
    {
        public DeleteTestTextCommandValidator()
        {
            RuleFor(p => p.TestId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
