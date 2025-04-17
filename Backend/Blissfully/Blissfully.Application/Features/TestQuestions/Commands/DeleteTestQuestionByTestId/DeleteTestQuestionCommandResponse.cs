using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.TestQuestions.Commands.DeleteTestQuestionByTestId
{
    public class DeleteTestQuestionCommandResponse : BaseResponse
    {
        public DeleteTestQuestionCommandResponse() : base()
        {

        }

        public DeleteTestQuestionDto TestQuestion { get; set; }
    }
}
