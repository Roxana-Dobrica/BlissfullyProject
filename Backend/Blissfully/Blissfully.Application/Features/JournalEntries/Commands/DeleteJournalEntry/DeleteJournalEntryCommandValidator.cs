using FluentValidation;

namespace Blissfully.Application.Features.JournalEntries.Commands.DeleteJournalEntry
{
    public class DeleteJournalEntryCommandValidator : AbstractValidator<DeleteJournalEntryCommand>
    {
        public DeleteJournalEntryCommandValidator() {
            RuleFor(p => p.JournalEntryId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");

        }
    }
}
