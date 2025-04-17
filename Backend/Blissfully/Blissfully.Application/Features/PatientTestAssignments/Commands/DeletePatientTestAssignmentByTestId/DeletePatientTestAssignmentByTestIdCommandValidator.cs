using FluentValidation;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignmentByTestId
{
    public class DeletePatientTestAssignmentByTestIdCommandValidator : AbstractValidator<DeletePatientTestAssignmentByTestIdCommand>
    {
        public DeletePatientTestAssignmentByTestIdCommandValidator()
        {
            RuleFor(p => p.TestId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
