using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TestQuestions.Commands.DeleteTestQuestionByTestId
{
    public class DeleteTestQuestionCommandHandler : IRequestHandler<DeleteTestQuestionCommand, DeleteTestQuestionCommandResponse>
    {
        private readonly ITestQuestionRepository repository;
        public DeleteTestQuestionCommandHandler(ITestQuestionRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteTestQuestionCommandResponse> Handle(DeleteTestQuestionCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteTestQuestionCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteTestQuestionCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    TestQuestion = new DeleteTestQuestionDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var TestQuestion = await repository.FindByTestIdAsync(request.TestId);
            if (TestQuestion.IsSuccess)
            {
                await repository.DeleteByTestIdAsync(request.TestId);
                return new DeleteTestQuestionCommandResponse
                {
                    Success = true,
                    TestQuestion = new DeleteTestQuestionDto
                    {
                        response = "Test Question deleted successfully"
                    }
                };
            }
            return new DeleteTestQuestionCommandResponse
            {
                Success = false,
                TestQuestion = new DeleteTestQuestionDto
                {
                    response = "Test Question not found"
                }
            };
        }
    }   
}
