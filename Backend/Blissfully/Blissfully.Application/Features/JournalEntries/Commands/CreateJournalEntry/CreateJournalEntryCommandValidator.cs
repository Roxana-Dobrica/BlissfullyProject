using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.JournalEntries.Commands.CreateJournalEntry
{
    public class CreateJournalEntryCommandValidator : AbstractValidator<CreateJournalEntryCommand>
    {
        private readonly IJournalEntryRepository repository;

        public CreateJournalEntryCommandValidator(IJournalEntryRepository repository)
        {

            RuleFor(e => e.EntryDate)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .LessThanOrEqualTo(System.DateTime.Now).WithMessage("{PropertyName} must be less than or equal to today's date");

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
