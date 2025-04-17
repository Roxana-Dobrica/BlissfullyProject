using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.JournalEntries.Commands.UpdateJournalEntry
{
    public class UpdateJournalEntryCommandResponse : BaseResponse
    {
        public UpdateJournalEntryCommandResponse() : base()
        {
        }
        public UpdateJournalEntryDto JournalEntry { get; set; } = default!;
    }
}
