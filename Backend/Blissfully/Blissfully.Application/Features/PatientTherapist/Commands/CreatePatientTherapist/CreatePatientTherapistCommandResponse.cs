using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTherapist.Commands.CreatePatientTherapist
{
    public class CreatePatientTherapistCommandResponse : BaseResponse
    {
        public CreatePatientTherapistCommandResponse() : base()
        {
        }
        public CreatePatientTherapistDto PatientTherapist { get; set; } = default!;
    }
}
