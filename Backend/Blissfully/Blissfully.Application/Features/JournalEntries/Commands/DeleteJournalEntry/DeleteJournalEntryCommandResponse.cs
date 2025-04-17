using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.JournalEntries.Commands.DeleteJournalEntry
{
    public class DeleteJournalEntryCommandResponse : BaseResponse
    {
        public DeleteJournalEntryCommandResponse() : base()
        {

        }

        public DeleteJournalEntryDto JournalEntry { get; set; }
    }
}
