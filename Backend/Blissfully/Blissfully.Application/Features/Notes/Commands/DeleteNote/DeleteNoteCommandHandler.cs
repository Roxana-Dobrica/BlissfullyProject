using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Notes.Commands.DeleteNote
{
    public class DeleteNoteCommandHandler : IRequestHandler<DeleteNoteCommand, DeleteNoteCommandResponse>
    {
        private readonly INoteRepository repository;
        public DeleteNoteCommandHandler(INoteRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteNoteCommandResponse> Handle(DeleteNoteCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteNoteCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteNoteCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    Note = new DeleteNoteDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var Note = await repository.FindByIdAsync(request.NoteId);
            if (Note.IsSuccess)
            {
                await repository.DeleteAsync(request.NoteId);
                return new DeleteNoteCommandResponse
                {
                    Success = true,
                    Note = new DeleteNoteDto
                    {
                        response = "Note Deleted Successfully"
                    }
                };
            }
            return new DeleteNoteCommandResponse
            {
                Success = false,
                Note = new DeleteNoteDto
                {
                    response = "Note Not Found"
                }
            };
        }
    }
}
