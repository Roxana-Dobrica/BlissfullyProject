using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment
{
    public class CreatePatientTestAssignmentCommandResponse : BaseResponse
    {
        public CreatePatientTestAssignmentCommandResponse() : base()
        {
        }

        public CreatePatientTestAssignmentDto PatientTestAssignment { get; set; } = default!;

    }
}
