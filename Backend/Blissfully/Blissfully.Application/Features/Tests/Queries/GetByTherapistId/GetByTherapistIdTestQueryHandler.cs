using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Tests.Queries.GetByTherapistId
{
    public class GetByTherapistIdTestQueryHandler : IRequestHandler<GetByTherapistIdTestQuery, GetByTherapistIdTestQueryResponse>
    {
        private readonly ITestRepository testRepository;
        public GetByTherapistIdTestQueryHandler(ITestRepository testRepository)
        {
            this.testRepository = testRepository;
        }

        public async Task<GetByTherapistIdTestQueryResponse> Handle(GetByTherapistIdTestQuery request, CancellationToken cancellationToken)
        {
            GetByTherapistIdTestQueryResponse response = new();
            var result = await testRepository.FindByTherapistIdAsync(request.therapistId);
            if (result.IsSuccess)
            {
                response.Tests = result.Value.Select(a => new TestDto
                {
                    TestId = a.TestId,
                    TherapistId = a.TherapistId,
                    TestTitle = a.TestTitle,
                }).ToList();
            }
            return response;
        }
    }
}
