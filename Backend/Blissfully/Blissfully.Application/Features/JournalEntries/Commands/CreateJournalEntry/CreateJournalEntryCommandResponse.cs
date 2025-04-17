using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.JournalEntries.Commands.CreateJournalEntry
{
    public class CreateJournalEntryCommandResponse : BaseResponse
    {
        public CreateJournalEntryCommandResponse() : base()
        {
        }
        public CreateJournalEntryDto JournalEntry { get; set; } = default!;
    }
}
