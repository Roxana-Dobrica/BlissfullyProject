using FluentValidation;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.UpdatePatientTestAssignment
{
    public class UpdatePatientTestAssignmentCommandValidator : AbstractValidator<UpdatePatientTestAssignmentCommand>
    {
        public UpdatePatientTestAssignmentCommandValidator()
        {
            RuleFor(e => e.PatientId)
                .NotEmpty().WithMessage("PatientId is required.")
                .NotNull().WithMessage("PatientId is required.");
            RuleFor(e => e.TestId)
                .NotEmpty().WithMessage("TestId is required.")
                .NotNull().WithMessage("TestId is required.");
        }
    }
}
