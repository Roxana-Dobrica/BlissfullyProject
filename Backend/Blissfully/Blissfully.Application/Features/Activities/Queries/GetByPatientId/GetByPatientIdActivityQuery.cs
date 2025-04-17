using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetByPatientId
{
    public class GetByPatientIdActivityQuery : IRequest<GetByPatientIdActivityQueryResponse>
    {
        public GetByPatientIdActivityQuery(Guid patientId)
        {
            this.patientId = patientId;
        }
        public Guid patientId { get; set; }
    }
}
