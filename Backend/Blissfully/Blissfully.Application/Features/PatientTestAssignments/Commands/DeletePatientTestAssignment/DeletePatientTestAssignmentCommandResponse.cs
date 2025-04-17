using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.DeletePatientTestAssignment
{
    public class DeletePatientTestAssignmentCommandResponse : BaseResponse
    {
        public DeletePatientTestAssignmentCommandResponse() : base()
        {

        }

        public DeletePatientTestAssignmentDto PatientTestAssignment { get; set; }
    }
}
