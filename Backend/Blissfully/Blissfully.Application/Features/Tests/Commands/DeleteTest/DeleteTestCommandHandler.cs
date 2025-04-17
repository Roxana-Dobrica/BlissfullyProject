using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Tests.Commands.DeleteTest
{
    public class DeleteTestCommandHandler : IRequestHandler<DeleteTestCommand, DeleteTestCommandResponse>
    {
        private readonly ITestRepository repository;

        public DeleteTestCommandHandler(ITestRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteTestCommandResponse> Handle(DeleteTestCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteTestCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteTestCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    Test = new DeleteTestDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var Test = await repository.FindByIdAsync(request.TestId);
            if (Test.IsSuccess)
            {
                await repository.DeleteAsync(request.TestId);
                return new DeleteTestCommandResponse
                {
                    Success = true,
                    Test = new DeleteTestDto
                    {
                        response = "Test deleted successfully"
                    }
                };
            }
            return new DeleteTestCommandResponse
            {
                Success = false,
                Test = new DeleteTestDto
                {
                    response = "Test not found"
                }
            };
        }
    }
}
