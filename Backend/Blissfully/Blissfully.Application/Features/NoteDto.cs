namespace Blissfully.Application.Features
{
    public class NoteDto
    {
        public Guid NoteId { get; set; }
        public Guid PatientId { get; set; }
        public string NoteContent { get; set; } = string.Empty;
        public DateTime NoteDate { get; set; }
    }
}
