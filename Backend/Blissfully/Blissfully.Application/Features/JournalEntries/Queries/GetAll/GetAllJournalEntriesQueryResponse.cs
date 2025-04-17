namespace Blissfully.Application.Features.JournalEntries.Queries.GetAll
{
    public class GetAllJournalEntriesQueryResponse
    {
        public List<JournalEntryDto> JournalEntries { get; set; } = default!;
    }
}
