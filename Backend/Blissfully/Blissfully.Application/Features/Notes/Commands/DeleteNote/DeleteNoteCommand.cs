using MediatR;

namespace Blissfully.Application.Features.Notes.Commands.DeleteNote
{
    public class DeleteNoteCommand : IRequest<DeleteNoteCommandResponse>
    {
        public Guid NoteId { get; set; } = default!;
    }
}
