using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.Notes.Commands.CreateNote
{
    public class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
    {
        private readonly INoteRepository repository;

        public CreateNoteCommandValidator(INoteRepository repository )
        {
            RuleFor(e => e.NoteContent)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(1000).WithMessage("{PropertyName} must not exceed 1000 characters");

            this.repository = repository;
        }
    }
}
