using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetPaged
{
    public class GetPagedActivitiesQuery : IRequest<GetPagedActivitiesQueryResponse>
    {
        public int Page { get; set; }
        public int Size { get; set; }
    }
}
