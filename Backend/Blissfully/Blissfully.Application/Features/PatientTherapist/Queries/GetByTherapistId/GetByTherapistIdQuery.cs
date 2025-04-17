using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Queries.GetByTherapistId
{
    public class GetByTherapistIdQuery : IRequest<GetByTherapistIdQueryResponse>
    {
        public GetByTherapistIdQuery(Guid therapistId)
        {
            this.therapistId = therapistId;
        }

        public Guid therapistId { get; set; }
    }
}
