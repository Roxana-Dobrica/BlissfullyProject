using MediatR;

namespace Blissfully.Application.Features.TestQuestion.Commands.CreateTestQuestion
{
    public class CreateTestQuestionCommand : ITestQuestionCommand, IRequest<CreateTestQuestionCommandResponse>
    {
    }
}
