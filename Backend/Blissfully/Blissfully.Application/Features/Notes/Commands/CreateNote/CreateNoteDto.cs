namespace Blissfully.Application.Features.Notes.Commands.CreateNote
{
    public class CreateNoteDto
    {
        public Guid NoteId { get; set; }
        public Guid PatientId { get; set; }
        public string NoteContent { get; set; } = string.Empty;
        public DateTime NoteDate { get; set; }
    }
}
