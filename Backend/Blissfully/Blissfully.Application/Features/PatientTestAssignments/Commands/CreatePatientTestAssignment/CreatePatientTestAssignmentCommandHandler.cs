using Blissfully.Application.Persistence;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment
{
    public class CreatePatientTestAssignmentCommandHandler : IRequestHandler<CreatePatientTestAssignmentCommand, CreatePatientTestAssignmentCommandResponse>
    {
        private readonly IPatientTestAssignmentRepository patientTestAssignmentRepository;
        private readonly ILogger<CreatePatientTestAssignmentCommandHandler> logger;

        public CreatePatientTestAssignmentCommandHandler(IPatientTestAssignmentRepository patientTestAssignmentRepository, ILogger<CreatePatientTestAssignmentCommandHandler> logger)
        {
            this.patientTestAssignmentRepository = patientTestAssignmentRepository;
            this.logger = logger;
        }

        public async Task<CreatePatientTestAssignmentCommandResponse> Handle(CreatePatientTestAssignmentCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreatePatientTestAssignmentCommandValidator(patientTestAssignmentRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreatePatientTestAssignmentCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var patientTestAssignment = Domain.Entities.PatientTestAssignment.Create(request.PatientId, request.TestId);
            if (patientTestAssignment.IsSuccess)
            {
                var result = patientTestAssignmentRepository.AddAsync(patientTestAssignment.Value);
                return new CreatePatientTestAssignmentCommandResponse()
                {
                    Success = true,
                    PatientTestAssignment = new CreatePatientTestAssignmentDto()
                    {
                        PatientTestAssignmentId = patientTestAssignment.Value.PatientTestAssignmentId,
                        PatientId = patientTestAssignment.Value.PatientId,
                        TestId = patientTestAssignment.Value.TestId,
                        IsCompleted = patientTestAssignment.Value.IsCompleted
                    }
                };
            }
            return new CreatePatientTestAssignmentCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { patientTestAssignment.Error }
            };
        }
    }
}
