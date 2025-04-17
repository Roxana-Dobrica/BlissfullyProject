using MediatR;

namespace Blissfully.Application.Features.Tests.Queries.GetByTherapistId
{
    public class GetByTherapistIdTestQuery : IRequest<GetByTherapistIdTestQueryResponse>
    {
        public GetByTherapistIdTestQuery(Guid therapistId)
        {
            this.therapistId = therapistId;
        }

        public Guid therapistId { get; set; }
    }
}
