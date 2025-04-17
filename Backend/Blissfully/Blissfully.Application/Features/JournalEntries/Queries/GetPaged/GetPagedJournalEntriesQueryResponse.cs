namespace Blissfully.Application.Features.JournalEntries.Queries.GetPaged
{
    public class GetPagedJournalEntriesQueryResponse
    {
        public List<JournalEntryDto> JournalEntries { get; set; } = default!;
    }
}
