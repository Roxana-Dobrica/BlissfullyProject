using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignmentByTestId
{
    public class DeletePatientTestAssignmentByTestIdCommand : IRequest<DeletePatientTestAssignmentByTestIdCommandResponse>
    {
        public Guid TestId { get; set; } = default!;
    }
}
