using MediatR;

namespace Blissfully.Application.Features.TestQuestions.Queries.GetQuestionsByTestId
{
    public class GetQuestionsByTestIdQuery : IRequest<GetQuestionsByTestIdQueryResponse>
    {
        public GetQuestionsByTestIdQuery(Guid testId)
        {
            this.testId = testId;
        }

        public Guid testId { get; set; }
    }
}
