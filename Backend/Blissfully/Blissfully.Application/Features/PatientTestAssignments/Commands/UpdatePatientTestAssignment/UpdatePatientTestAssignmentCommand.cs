using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.UpdatePatientTestAssignment
{
    public class UpdatePatientTestAssignmentCommand : IPatientTestAssignmentCommand, IRequest<UpdatePatientTestAssignmentCommandResponse>
    {
        public Guid PatientId { get; set; } = default!;
        public Guid TestId { get; set; } = default!;
    }
}
