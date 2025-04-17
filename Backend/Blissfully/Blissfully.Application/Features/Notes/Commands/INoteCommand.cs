namespace Blissfully.Application.Features.Notes.Commands
{
    public class INoteCommand
    {
        public Guid PatientId { get; set; }
        public string NoteContent { get; set; } = string.Empty;
        public DateTime NoteDate { get; set; }
    }
}
