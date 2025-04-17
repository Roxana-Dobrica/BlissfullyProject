using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.CreatePatientTestAnswer
{
    public class CreatePatientTestAnswerCommandResponse : BaseResponse
    {
        public CreatePatientTestAnswerCommandResponse() : base()
        {
        }

        public CreatePatientTestAnswerDto PatientTestAnswer { get; set; } = default!;
    }
}
