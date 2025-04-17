namespace Blissfully.Application.Features.JournalEntries.Commands.CreateJournalEntry
{
    public class CreateJournalEntryDto
    {
        public Guid JournalEntryId { get; set; }
        public Guid UserId { get; set; }
        public DateTime EntryDate { get; set; }
        public string EntryTitle { get; set; } = string.Empty;
        public string EntryContent { get; set; } = string.Empty;
        public List<string>? Feelings { get; set; }
        public string? ImageUrl { get; set; }
    }
}
