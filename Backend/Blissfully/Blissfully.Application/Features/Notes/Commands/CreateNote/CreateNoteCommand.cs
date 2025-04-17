using MediatR;

namespace Blissfully.Application.Features.Notes.Commands.CreateNote
{
    public class CreateNoteCommand : INoteCommand, IRequest<CreateNoteCommandResponse>
    {
    }
}
