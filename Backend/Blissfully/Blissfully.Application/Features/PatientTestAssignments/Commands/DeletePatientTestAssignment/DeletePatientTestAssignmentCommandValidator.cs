using FluentValidation;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment
{
    public class DeletePatientTestAssignmentCommandValidator : AbstractValidator<DeletePatientTestAssignmentCommand>
    {
        public DeletePatientTestAssignmentCommandValidator()
        {
            RuleFor(p => p.PatientId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
            RuleFor(p => p.TestId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
