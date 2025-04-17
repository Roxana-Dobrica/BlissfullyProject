using MediatR;

namespace Blissfully.Application.Features.Notes.Queries.GetByPatientId
{
    public class GetByPatientIdNotesQuery : IRequest<GetByPatientIdNotesQueryResponse>
    {
        public GetByPatientIdNotesQuery(Guid patientId)
        {
            this.patientId = patientId;
        }
        public Guid patientId { get; set; }
    }
}
