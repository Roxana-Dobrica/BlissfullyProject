using Blissfully.Application.Features.Tests.Commands.CreateTest;
using Blissfully.Application.Features.Tests.Commands;
using MediatR;

namespace Blissfully.Application.Features.TestTexts.Commands.CreateTestTexts
{
    public class CreateTestTextCommand : ITestTextCommand, IRequest<CreateTestTextCommandResponse>
    {
    }
}
