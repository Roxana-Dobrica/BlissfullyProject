using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Commands.DeletePatientTherapist
{
    public class DeletePatientTherapistCommandHandler : IRequestHandler<DeletePatientTherapistCommand, DeletePatientTherapistCommandResponse>
    {
        private readonly IPatientTherapistRepository repository;
        public DeletePatientTherapistCommandHandler(IPatientTherapistRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeletePatientTherapistCommandResponse> Handle(DeletePatientTherapistCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeletePatientTherapistCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeletePatientTherapistCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    PatientTherapist = new DeletePatientTherapistDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var PatientTherapist = await repository.FindByPatientAndTherapistIdAsync(request.PatientId, request.TherapistId);
            if (PatientTherapist.IsSuccess)
            {
                await repository.DeleteByPatientAndTherapistIdAsync(request.PatientId, request.TherapistId);
                return new DeletePatientTherapistCommandResponse
                {
                    Success = true,
                    PatientTherapist = new DeletePatientTherapistDto
                    {
                        response = "Patient Therapist Assignment Deleted Successfully"
                    }
                };
            }
            return new DeletePatientTherapistCommandResponse
            {
                Success = false,
                PatientTherapist = new DeletePatientTherapistDto
                {
                    response = "Patient Therapist Assignment Not Found"
                }
            };
        }
    }
}
