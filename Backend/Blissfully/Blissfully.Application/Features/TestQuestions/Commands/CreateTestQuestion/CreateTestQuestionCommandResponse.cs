using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.TestQuestion.Commands.CreateTestQuestion
{
    public class CreateTestQuestionCommandResponse : BaseResponse
    {
        public CreateTestQuestionCommandResponse() : base()
        {
        }
        public CreateTestQuestionDto TestQuestion { get; set; } = default!;
    }
}
