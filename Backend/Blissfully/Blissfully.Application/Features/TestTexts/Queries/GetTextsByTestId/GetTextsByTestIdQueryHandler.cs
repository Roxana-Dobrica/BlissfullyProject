using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.TestTexts.Queries.GetTextsByTestId
{
    public class GetTextsByTestIdQueryHandler : IRequestHandler<GetTextsByTestIdQuery, GetTextsByTestIdQueryResponse>
    {
        private readonly ITestTextRepository testTextRepository;

        public GetTextsByTestIdQueryHandler(ITestTextRepository testTextRepository)
        {
            this.testTextRepository = testTextRepository;
        }

        public async Task<GetTextsByTestIdQueryResponse> Handle(GetTextsByTestIdQuery request, CancellationToken cancellationToken)
        {
            GetTextsByTestIdQueryResponse response = new();
            var result = await testTextRepository.FindByTestIdAsync(request.testId);
            if (result.IsSuccess)
            {
                response.Texts = result.Value.Select(a => new TestTextDto
                {
                    TestTextId = a.TestTextId,
                    TestId = a.TestId,
                    Text = a.Text,
                    Order = a.Order
                }).ToList();
            }
            return response;
        }
    }
}