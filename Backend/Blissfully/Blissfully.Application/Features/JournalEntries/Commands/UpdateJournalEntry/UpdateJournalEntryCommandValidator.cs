using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.JournalEntries.Commands.UpdateJournalEntry
{
    public class UpdateJournalEntryCommandValidator : AbstractValidator<UpdateJournalEntryCommand>
    {
        private readonly IJournalEntryRepository repository;

        public UpdateJournalEntryCommandValidator(IJournalEntryRepository repository)
        {
            RuleFor(e => e.EntryDate)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .GreaterThanOrEqualTo(DateTime.Now.Date).WithMessage("{PropertyName} must be greater than or equal to current date");

            RuleFor(e => e.EntryTitle)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters");

            RuleFor(e => e.EntryContent)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(3000).WithMessage("{PropertyName} must not exceed 3000 characters");

            this.repository = repository;
        }
    }
}
