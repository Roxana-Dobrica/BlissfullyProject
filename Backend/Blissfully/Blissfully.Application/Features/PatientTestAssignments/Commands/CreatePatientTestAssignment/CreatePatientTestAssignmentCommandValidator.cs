using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment
{
    public class CreatePatientTestAssignmentCommandValidator : AbstractValidator<CreatePatientTestAssignmentCommand>
    {
        private readonly IPatientTestAssignmentRepository repository;

        public CreatePatientTestAssignmentCommandValidator(IPatientTestAssignmentRepository repository)
        {
            RuleFor(e => e.PatientId)
                .NotEmpty().WithMessage("PatientId is required.")
                .NotNull().WithMessage("PatientId is required.");
            RuleFor(e => e.TestId)
                .NotEmpty().WithMessage("TestId is required.")
                .NotNull().WithMessage("TestId is required.");

            this.repository = repository;
        }
    }
}
