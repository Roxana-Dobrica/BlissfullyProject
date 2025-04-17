using MediatR;

namespace Blissfully.Application.Features.TestTexts.Queries.GetTextsByTestId
{
    public class GetTextsByTestIdQuery : IRequest<GetTextsByTestIdQueryResponse>
    {
        public GetTextsByTestIdQuery(Guid testId)
        {
            this.testId = testId;
        }

        public Guid testId { get; set; }
    }
}
