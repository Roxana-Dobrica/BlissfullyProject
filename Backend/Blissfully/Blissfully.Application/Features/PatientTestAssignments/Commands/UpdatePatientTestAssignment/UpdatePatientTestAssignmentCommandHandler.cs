using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.UpdatePatientTestAssignment
{
    public class UpdatePatientTestAssignmentCommandHandler : IRequestHandler<UpdatePatientTestAssignmentCommand, UpdatePatientTestAssignmentCommandResponse>
    {
        private readonly IPatientTestAssignmentRepository repository;

        public UpdatePatientTestAssignmentCommandHandler(IPatientTestAssignmentRepository repository)
        {
            this.repository = repository;
        }

        public async Task<UpdatePatientTestAssignmentCommandResponse> Handle(UpdatePatientTestAssignmentCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdatePatientTestAssignmentCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new UpdatePatientTestAssignmentCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList()
                };
            }

            var patientTestAssignment = await repository.FindByPatientAndTestIdAsync(request.PatientId, request.TestId);
            if (patientTestAssignment.IsSuccess)
            {
                patientTestAssignment.Value.Update(
                    request.PatientId,
                    request.TestId,
                    request.IsCompleted
                    );

                await repository.UpdateAsync(patientTestAssignment.Value);

                return new UpdatePatientTestAssignmentCommandResponse
                {
                    Success = true,
                    PatientTestAssignment = new UpdatePatientTestAssignmentDto
                    {
                        PatientTestAssignmentId = patientTestAssignment.Value.PatientTestAssignmentId,
                    }
                };
            }
            return new UpdatePatientTestAssignmentCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string> { "Patient Test Assignment Not Found" }
            };
        }
    }
}
