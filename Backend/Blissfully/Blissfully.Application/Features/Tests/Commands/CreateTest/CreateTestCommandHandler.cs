using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.Tests.Commands.CreateTest
{
    public class CreateTestCommandHandler : IRequestHandler<CreateTestCommand, CreateTestCommandResponse>
    {
        private readonly ITestRepository testRepository;
        private readonly ILogger<CreateTestCommandHandler> logger;

        public CreateTestCommandHandler(ITestRepository testRepository, ILogger<CreateTestCommandHandler> logger)
        {
            this.testRepository = testRepository;
            this.logger = logger;
        }

        public async Task<CreateTestCommandResponse> Handle(CreateTestCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateTestCommandValidator(testRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if(!validatorResult.IsValid)
            {
                return new CreateTestCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var test = Test.Create(request.TestTitle, request.TherapistId);
            if (test.IsSuccess)
            {
                var result = testRepository.AddAsync(test.Value);
                return new CreateTestCommandResponse()
                {
                    Success = true,
                    Test = new CreateTestDto()
                    {
                        TestId = test.Value.TestId,
                        TherapistId = test.Value.TherapistId,
                        TestTitle = test.Value.TestTitle
                    }
                };
            }
            return new CreateTestCommandResponse()
            {
                Success = false,
                ValidationsErrors = new List<string>() { test.Error }
            };
        }
    }
}
