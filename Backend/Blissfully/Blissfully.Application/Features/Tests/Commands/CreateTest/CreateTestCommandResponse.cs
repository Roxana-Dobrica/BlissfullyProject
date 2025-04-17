using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Tests.Commands.CreateTest
{
    public class CreateTestCommandResponse : BaseResponse
    {
        public CreateTestCommandResponse() : base()
        {
        }
        public CreateTestDto Test { get; set; } = default!;
    }
}
