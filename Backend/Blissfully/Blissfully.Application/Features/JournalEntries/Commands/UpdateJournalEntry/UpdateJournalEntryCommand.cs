using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Commands.UpdateJournalEntry
{
    public class UpdateJournalEntryCommand : IJournalEntryCommand, IRequest<UpdateJournalEntryCommandResponse>
    {
        public Guid JournalEntryId { get; set; } = default!;
    }
}
