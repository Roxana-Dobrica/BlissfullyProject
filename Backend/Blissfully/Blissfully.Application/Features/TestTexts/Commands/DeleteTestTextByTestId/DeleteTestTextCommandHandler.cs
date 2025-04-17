using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TestTexts.Commands.DeleteTestTextByTestId
{
    public class DeleteTestTextCommandHandler : IRequestHandler<DeleteTestTextCommand, DeleteTestTextCommandResponse>
    {
        private readonly ITestTextRepository repository;
        public DeleteTestTextCommandHandler(ITestTextRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteTestTextCommandResponse> Handle(DeleteTestTextCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteTestTextCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteTestTextCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    TestText = new DeleteTestTextDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var TestText = await repository.FindByTestIdAsync(request.TestId);
            if (TestText.IsSuccess)
            {
                await repository.DeleteByTestIdAsync(request.TestId);
                return new DeleteTestTextCommandResponse
                {
                    Success = true,
                    TestText = new DeleteTestTextDto
                    {
                        response = "Test Text deleted successfully"
                    }
                };
            }
            return new DeleteTestTextCommandResponse
            {
                Success = false,
                TestText = new DeleteTestTextDto
                {
                    response = "Test Text not found"
                }
            };
        }
    }
}
