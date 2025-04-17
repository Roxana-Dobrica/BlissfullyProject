using Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment;
using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignmentByTestId
{
    public class DeletePatientTestAssignmentByTestIdCommandResponse : BaseResponse
    {
        public DeletePatientTestAssignmentByTestIdCommandResponse() : base()
        {

        }

        public DeletePatientTestAssignmentDto PatientTestAssignment { get; set; }
    }
}
