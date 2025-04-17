using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Notes.Commands.CreateNote
{
    public class CreateNoteCommandResponse : BaseResponse
    {
        public CreateNoteCommandResponse() : base()
        {
        }

        public CreateNoteDto Note { get; set; } = default!;
    }
}
