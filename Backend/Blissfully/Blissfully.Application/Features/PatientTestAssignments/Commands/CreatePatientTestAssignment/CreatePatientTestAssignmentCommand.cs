using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment
{
    public class CreatePatientTestAssignmentCommand : IPatientTestAssignmentCommand, IRequest<CreatePatientTestAssignmentCommandResponse>
    {
    }
}
