using FluentValidation;

namespace Blissfully.Application.Features.PatientTherapist.Commands.DeletePatientTherapist
{
    public class DeletePatientTherapistCommandValidator : AbstractValidator<DeletePatientTherapistCommand>
    {
        public DeletePatientTherapistCommandValidator()
        {
            RuleFor(p => p.PatientId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
            RuleFor(p => p.TherapistId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");

        }
    }
}
