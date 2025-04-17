using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.TestTexts.Commands.CreateTestTexts
{
    public class CreateTestTextCommandResponse : BaseResponse
    {
        public CreateTestTextCommandResponse() : base()
        {
        }
        public CreateTestTextDto TestText { get; set; } = default!;
    }
}
