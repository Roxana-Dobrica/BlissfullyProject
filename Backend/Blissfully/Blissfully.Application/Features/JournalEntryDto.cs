namespace Blissfully.Application.Features
{
    public class JournalEntryDto
    {
        public Guid JournalEntryId { get; set; } = default!;
        public Guid UserId { get; set; } = default!;
        public DateTime EntryDate { get; set; }
        public string EntryTitle { get; set; } = string.Empty;
        public string EntryContent { get; set; } = string.Empty;
        public List<string>? Feelings { get; set; }
        public string? ImageUrl { get; set; }
    }
}
