using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.PatientTherapist.Commands.CreatePatientTherapist
{
    public class CreatePatientTherapistCommandValidator : AbstractValidator<CreatePatientTherapistCommand>
    {
        private readonly IPatientTherapistRepository repository;

        public CreatePatientTherapistCommandValidator(IPatientTherapistRepository repository)
        {
            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("Patient is required");

            RuleFor(x => x.TherapistId)
                .NotEmpty().WithMessage("Therapist is required");

            this.repository = repository;
        }
    }
}
