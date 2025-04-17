using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.DeletePatientTestAnswer
{
    public class DeletePatientTestAnswerCommandResponse : BaseResponse
    {
        public DeletePatientTestAnswerCommandResponse() : base()
        {

        }

        public DeletePatientTestAnswerDto PatientTestAnswer { get; set; }
    }
}
