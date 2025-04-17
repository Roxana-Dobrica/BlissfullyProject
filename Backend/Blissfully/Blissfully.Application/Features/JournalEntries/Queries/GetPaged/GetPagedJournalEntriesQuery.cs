using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetPaged
{
    public class GetPagedJournalEntriesQuery : IRequest<GetPagedJournalEntriesQueryResponse>
    {
        public int Page { get; set; }
        public int Size { get; set; }
    }
}
