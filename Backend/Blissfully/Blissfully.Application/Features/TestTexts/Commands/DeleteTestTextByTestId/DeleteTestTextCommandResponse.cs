using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.TestTexts.Commands.DeleteTestTextByTestId
{
    public class DeleteTestTextCommandResponse : BaseResponse
    {
        public DeleteTestTextCommandResponse() : base()
        {

        }

        public DeleteTestTextDto TestText { get; set; }
    }
}
