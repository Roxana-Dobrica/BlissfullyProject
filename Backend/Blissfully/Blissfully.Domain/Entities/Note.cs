using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class Note : AuditableEntity
    {
        private Note(Guid patientId, string noteContent, DateTime noteDate)
        {
            NoteId = Guid.NewGuid();
            PatientId = patientId;
            NoteContent = noteContent;
            NoteDate = DateTime.UtcNow.Date;
        }
        public Guid NoteId { get; private set; }
        public Guid PatientId { get; private set; }
        public string NoteContent { get; private set; } = string.Empty;
        public DateTime NoteDate { get; private set; }

        public static Result<Note> Create(Guid patientId, string noteContent, DateTime noteDate)
        {
            if (string.IsNullOrWhiteSpace(noteContent))
            {
                return Result<Note>.Failure("Note is required");
            }
            return Result<Note>.Success(new Note(patientId, noteContent, noteDate));
        }
    }
}
