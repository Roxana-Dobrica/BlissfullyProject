using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Notes.Commands.DeleteNote
{
    public class DeleteNoteCommandResponse : BaseResponse
    {
        public DeleteNoteCommandResponse() : base()
        {

        }

        public DeleteNoteDto Note { get; set; }
    }
}
