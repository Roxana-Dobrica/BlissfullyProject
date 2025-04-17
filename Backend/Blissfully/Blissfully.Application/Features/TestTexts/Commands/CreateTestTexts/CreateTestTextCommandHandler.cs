using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.TestTexts.Commands.CreateTestTexts
{
    public class CreateTestTextCommandHandler : IRequestHandler<CreateTestTextCommand, CreateTestTextCommandResponse>
    {
        private readonly ITestTextRepository testTextRepository;
        private readonly ILogger<CreateTestTextCommandHandler> logger;

        public CreateTestTextCommandHandler(ITestTextRepository testTextRepository, ILogger<CreateTestTextCommandHandler> logger)
        {
            this.testTextRepository = testTextRepository;
            this.logger = logger;
        }

        public async Task<CreateTestTextCommandResponse> Handle(CreateTestTextCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateTestTextCommandValidator(testTextRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateTestTextCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var testText = TestText.Create(request.TestId, request.Text, request.Order);
            if (testText.IsSuccess)
            {
                var result = testTextRepository.AddAsync(testText.Value);
                return new CreateTestTextCommandResponse()
                {
                    Success = true,
                    TestText = new CreateTestTextDto()
                    {
                        TestId = testText.Value.TestId,
                        Text = testText.Value.Text,
                        Order = testText.Value.Order
                    }
                };
            }
            return new CreateTestTextCommandResponse()
            {
                Success = false,
                ValidationsErrors = new List<string>() { testText.Error }
            };
        }
    }
}
