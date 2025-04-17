namespace Blissfully.Application.Features.Notes.Queries.GetByPatientId
{
    public class GetByPatientIdNotesQueryResponse
    {
        public List<NoteDto> Notes { get; set; } = default!;
    }
}
