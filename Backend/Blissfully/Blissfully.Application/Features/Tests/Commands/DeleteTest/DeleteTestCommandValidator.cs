using FluentValidation;

namespace Blissfully.Application.Features.Tests.Commands.DeleteTest
{
    public class DeleteTestCommandValidator : AbstractValidator<DeleteTestCommand>
    {
        public DeleteTestCommandValidator()
        {
            RuleFor(p => p.TestId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
