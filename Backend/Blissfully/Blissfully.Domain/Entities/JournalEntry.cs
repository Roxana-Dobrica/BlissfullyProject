using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class JournalEntry : AuditableEntity
    {
        private JournalEntry(Guid userId, DateTime entryDate, string entryTitle, string entryContent)
        {
            JournalEntryId = Guid.NewGuid();
            UserId = userId;
            EntryTitle = entryTitle;
            EntryDate = entryDate;
            EntryContent = entryContent;
        }
        public Guid JournalEntryId { get; private set; }
        public Guid UserId { get; private set; }
        public DateTime EntryDate { get; private set; }
        public string EntryTitle { get; private set; } = string.Empty;
        public string EntryContent { get; private set; } = string.Empty;
        public List<string>? Feelings { get; private set; }
        public string? ImageUrl { get; private set; }

        public static Result<JournalEntry> Create(Guid userId, DateTime entryDate, string entryTitle, string entryContent)
        {
            if (entryDate == DateTime.MinValue)
            {
                return Result<JournalEntry>.Failure("Entry date is required");
            }
            if (string.IsNullOrWhiteSpace(entryContent))
            {
                return Result<JournalEntry>.Failure("Entry content is required");
            }
            return Result<JournalEntry>.Success(new JournalEntry(userId, entryDate, entryTitle, entryContent));
        }

        public void Update(DateTime entryDate, string entryContent, List<string>? feelings, string? imageUrl)
        {
            EntryDate = entryDate;
            EntryContent = entryContent;
            Feelings = feelings;
            ImageUrl = imageUrl;
        }

        public void AttachFeelings(List<string>? feelings)
        {
            if(feelings != null && feelings.Any())
            {
                Feelings = feelings;
            }
        }

        public void AttachImageUrl(string imageUrl)
        {
            if (!string.IsNullOrWhiteSpace(imageUrl))
            {
                ImageUrl = imageUrl;
            }
        }

    }
}
