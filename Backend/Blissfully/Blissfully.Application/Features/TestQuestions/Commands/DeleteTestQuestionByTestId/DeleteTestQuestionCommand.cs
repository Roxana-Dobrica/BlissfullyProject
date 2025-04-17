using MediatR;

namespace Blissfully.Application.Features.TestQuestions.Commands.DeleteTestQuestionByTestId
{
    public class DeleteTestQuestionCommand : IRequest<DeleteTestQuestionCommandResponse>
    {
        public Guid TestId { get; set; } = default!;
    }
}
