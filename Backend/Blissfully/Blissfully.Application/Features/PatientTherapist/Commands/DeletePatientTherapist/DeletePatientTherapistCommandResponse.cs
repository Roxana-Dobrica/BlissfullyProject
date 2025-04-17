using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTherapist.Commands.DeletePatientTherapist
{
    public class DeletePatientTherapistCommandResponse : BaseResponse
    {
        public DeletePatientTherapistCommandResponse() : base()
        {

        }

        public DeletePatientTherapistDto PatientTherapist { get; set; }
    }
}
