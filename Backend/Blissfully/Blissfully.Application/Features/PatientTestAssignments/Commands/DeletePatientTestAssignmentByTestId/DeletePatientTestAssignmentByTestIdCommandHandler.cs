using Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment;
using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignmentByTestId
{
    public class DeletePatientTestAssignmentByTestIdCommandHandler : IRequestHandler<DeletePatientTestAssignmentByTestIdCommand, DeletePatientTestAssignmentByTestIdCommandResponse>
    {
        private readonly IPatientTestAssignmentRepository repository;
        public DeletePatientTestAssignmentByTestIdCommandHandler(IPatientTestAssignmentRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeletePatientTestAssignmentByTestIdCommandResponse> Handle(DeletePatientTestAssignmentByTestIdCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeletePatientTestAssignmentByTestIdCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeletePatientTestAssignmentByTestIdCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    PatientTestAssignment = new DeletePatientTestAssignmentDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var PatientTestAssignment = await repository.FindByTestIdAsync(request.TestId);
            if (PatientTestAssignment.IsSuccess)
            {
                await repository.DeleteByTestIdAsync(request.TestId);
                return new DeletePatientTestAssignmentByTestIdCommandResponse
                {
                    Success = true,
                    PatientTestAssignment = new DeletePatientTestAssignmentDto
                    {
                        response = "Patient-test assignment deleted successfully"
                    }
                };
            }
            return new DeletePatientTestAssignmentByTestIdCommandResponse
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
