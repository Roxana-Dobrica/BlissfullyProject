using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment
{
    public class DeletePatientTestAssignmentCommandHandler : IRequestHandler<DeletePatientTestAssignmentCommand, DeletePatientTestAssignmentCommandResponse>
    {
        private readonly IPatientTestAssignmentRepository repository;
        public DeletePatientTestAssignmentCommandHandler(IPatientTestAssignmentRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeletePatientTestAssignmentCommandResponse> Handle(DeletePatientTestAssignmentCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeletePatientTestAssignmentCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeletePatientTestAssignmentCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    PatientTestAssignment = new DeletePatientTestAssignmentDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var PatientTestAssignment = await repository.FindByPatientAndTestIdAsync(request.PatientId, request.TestId);
            if (PatientTestAssignment.IsSuccess)
            {
                await repository.DeleteByPatientAndTestIdAsync(request.PatientId, request.TestId);
                return new DeletePatientTestAssignmentCommandResponse
                {
                    Success = true,
                    PatientTestAssignment = new DeletePatientTestAssignmentDto
                    {
                        response = "Patient-test assignment deleted successfully"
                    }
                };
            }
            return new DeletePatientTestAssignmentCommandResponse
            {
                Success = false,
                PatientTestAssignment = new DeletePatientTestAssignmentDto
                {
                    response = "Patient-test assignment not found"
                }
            };
        }
    }
}
