using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.UpdatePatientTestAssignment
{
    public class UpdatePatientTestAssignmentCommandResponse : BaseResponse
    {
        public UpdatePatientTestAssignmentCommandResponse() : base()
        {
        }
        public UpdatePatientTestAssignmentDto PatientTestAssignment { get; set; }
    }

}
