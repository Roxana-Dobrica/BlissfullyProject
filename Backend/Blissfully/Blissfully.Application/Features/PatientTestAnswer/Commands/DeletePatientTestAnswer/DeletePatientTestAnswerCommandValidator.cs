using FluentValidation;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.DeletePatientTestAnswer
{
    public class DeletePatientTestAnswerCommandValidator : AbstractValidator<DeletePatientTestAnswerCommand>
    {
        public DeletePatientTestAnswerCommandValidator()
        {
            RuleFor(p => p.TestId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
