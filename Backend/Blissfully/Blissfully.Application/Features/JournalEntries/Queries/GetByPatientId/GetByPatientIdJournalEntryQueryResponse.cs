namespace Blissfully.Application.Features.JournalEntries.Queries.GetByPatientId
{
    public class GetByPatientIdJournalEntryQueryResponse
    {
        public List<JournalEntryDto> JournalEntries { get; set; } = default!;
    }
}
