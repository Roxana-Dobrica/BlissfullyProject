using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Commands.DeleteJournalEntry
{
    public class DeleteJournalEntryCommand : IRequest<DeleteJournalEntryCommandResponse>
    {
        public Guid JournalEntryId { get; set; } = default!;
    }
}
