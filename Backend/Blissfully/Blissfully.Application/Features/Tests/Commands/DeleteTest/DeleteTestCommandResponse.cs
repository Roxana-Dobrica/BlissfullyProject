using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Tests.Commands.DeleteTest
{
    public class DeleteTestCommandResponse : BaseResponse
    {
        public DeleteTestCommandResponse() : base()
        {

        }

        public DeleteTestDto Test { get; set; }
    }
}
