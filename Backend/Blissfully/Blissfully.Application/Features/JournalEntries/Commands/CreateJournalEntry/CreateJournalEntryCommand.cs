using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Commands.CreateJournalEntry
{
    public class CreateJournalEntryCommand : IJournalEntryCommand, IRequest<CreateJournalEntryCommandResponse>
    {
    }
}
