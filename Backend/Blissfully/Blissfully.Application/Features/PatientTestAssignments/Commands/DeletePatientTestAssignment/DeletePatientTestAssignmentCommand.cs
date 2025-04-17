using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment
{
    public class DeletePatientTestAssignmentCommand : IRequest<DeletePatientTestAssignmentCommandResponse>
    {
        public Guid PatientId { get; set; } = default!;
        public Guid TestId { get; set; } = default!;
    }
}
