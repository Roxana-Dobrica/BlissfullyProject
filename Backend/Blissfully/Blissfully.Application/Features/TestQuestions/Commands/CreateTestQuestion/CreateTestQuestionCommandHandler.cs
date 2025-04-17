using Blissfully.Application.Persistence;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.TestQuestion.Commands.CreateTestQuestion
{
    public class CreateTestQuestionCommandHandler : IRequestHandler<CreateTestQuestionCommand, CreateTestQuestionCommandResponse>
    {
        private readonly ITestQuestionRepository testQuestionRepository;
        private readonly ILogger<CreateTestQuestionCommandHandler> logger;

        public CreateTestQuestionCommandHandler(ITestQuestionRepository testQuestionRepository, ILogger<CreateTestQuestionCommandHandler> logger)
        {
            this.testQuestionRepository = testQuestionRepository;
            this.logger = logger;
        }

        public async Task<CreateTestQuestionCommandResponse> Handle(CreateTestQuestionCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateTestQuestionCommandValidator(testQuestionRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateTestQuestionCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var testQuestion = Domain.Entities.TestQuestion.Create(request.TestId, request.Question, request.Type, request.Answers, request.Order);
            if (testQuestion.IsSuccess)
            {
                var result = testQuestionRepository.AddAsync(testQuestion.Value);
                return new CreateTestQuestionCommandResponse()
                {
                    Success = true,
                    TestQuestion = new CreateTestQuestionDto()
                    {
                        TestId = testQuestion.Value.TestId,
                        Question = testQuestion.Value.Question,
                        Type = testQuestion.Value.Type,
                        Answers = testQuestion.Value.Answers,
                        Order = testQuestion.Value.Order
                    }
                };
            }
            return new CreateTestQuestionCommandResponse()
            {
                Success = false,
                ValidationsErrors = new List<string>() { testQuestion.Error }
            };
        }
    }
}
