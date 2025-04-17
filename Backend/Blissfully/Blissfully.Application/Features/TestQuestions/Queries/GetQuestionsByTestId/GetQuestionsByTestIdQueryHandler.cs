using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TestQuestions.Queries.GetQuestionsByTestId
{
    public class GetQuestionsByTestIdQueryHandler : IRequestHandler<GetQuestionsByTestIdQuery, GetQuestionsByTestIdQueryResponse>
    {
        private readonly ITestQuestionRepository testQuestionRepository;

        public GetQuestionsByTestIdQueryHandler(ITestQuestionRepository testQuestionRepository)
        {
            this.testQuestionRepository = testQuestionRepository;
        }

        public async Task<GetQuestionsByTestIdQueryResponse> Handle(GetQuestionsByTestIdQuery request, CancellationToken cancellationToken)
        {
            GetQuestionsByTestIdQueryResponse response = new();
            var result = await testQuestionRepository.FindByTestIdAsync(request.testId);
            if (result.IsSuccess)
            {
                response.Questions = result.Value.Select(a => new QuestionDto
                {
                    TestQuestionId = a.TestQuestionId,
                    TestId = a.TestId,
                    Question = a.Question,
                    Type = a.Type,
                    Answers = a.Answers,
                    Order = a.Order
                }).ToList();
            }
            return response;
        }
    }
}
