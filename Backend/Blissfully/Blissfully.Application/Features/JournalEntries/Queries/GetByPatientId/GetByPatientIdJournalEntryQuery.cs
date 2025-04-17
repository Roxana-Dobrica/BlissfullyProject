using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetByPatientId
{
    public class GetByPatientIdJournalEntryQuery : IRequest<GetByPatientIdJournalEntryQueryResponse>
    {
        public GetByPatientIdJournalEntryQuery(Guid patientId)
        {
            this.patientId = patientId;
        }

        public Guid patientId { get; set; }
    }
}
