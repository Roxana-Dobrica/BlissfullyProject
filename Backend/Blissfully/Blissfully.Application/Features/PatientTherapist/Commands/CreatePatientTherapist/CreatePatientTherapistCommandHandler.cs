using Blissfully.Application.Persistence;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.PatientTherapist.Commands.CreatePatientTherapist
{
    public class CreatePatientTherapistCommandHandler : IRequestHandler<CreatePatientTherapistCommand, CreatePatientTherapistCommandResponse>
    {
        private readonly IPatientTherapistRepository patientTherapistRepository;
        private readonly ILogger<CreatePatientTherapistCommandHandler> logger;

        public CreatePatientTherapistCommandHandler(IPatientTherapistRepository patientTherapistRepository, ILogger<CreatePatientTherapistCommandHandler> logger)
        {
            this.patientTherapistRepository = patientTherapistRepository;
            this.logger = logger;
        }

        public async Task<CreatePatientTherapistCommandResponse> Handle(CreatePatientTherapistCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreatePatientTherapistCommandValidator(patientTherapistRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreatePatientTherapistCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var patientTherapist = Domain.Entities.PatientTherapist.Create(request.PatientId, request.TherapistId);
            if (patientTherapist.IsSuccess)
            {
                var result = patientTherapistRepository.AddAsync(patientTherapist.Value);
                return new CreatePatientTherapistCommandResponse()
                {
                    Success = true,
                    PatientTherapist = new CreatePatientTherapistDto()
                    {
                        PatientTherapistId = patientTherapist.Value.PatientTherapistId,
                        PatientId = patientTherapist.Value.PatientId,
                        TherapistId = patientTherapist.Value.TherapistId
                    }
                };
            }
            return new CreatePatientTherapistCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { patientTherapist.Error }
            };
        }
    }
}
