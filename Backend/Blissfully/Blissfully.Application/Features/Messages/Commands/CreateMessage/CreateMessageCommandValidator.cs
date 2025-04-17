using FluentValidation;

namespace Blissfully.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageCommandValidator : AbstractValidator<CreateMessageCommand>
    {
        public CreateMessageCommandValidator()
        {

            RuleFor(p => p.MessageContent)
               .NotEmpty().WithMessage("{Message} is required.")
               .NotNull()
               .MaximumLength(1000).WithMessage("{Message} must not exceed 500 characters.")
               .MinimumLength(1).WithMessage("{Message} must be at least 1 characters.");
        }
    }
}
