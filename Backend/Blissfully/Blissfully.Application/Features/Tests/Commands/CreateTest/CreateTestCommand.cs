using MediatR;

namespace Blissfully.Application.Features.Tests.Commands.CreateTest
{
    public class CreateTestCommand : ITestCommand, IRequest<CreateTestCommandResponse>
    {
    }
}
