using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.Notes.Commands.CreateNote
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, CreateNoteCommandResponse>
    {
        private readonly INoteRepository noteRepository;
        private readonly ILogger<CreateNoteCommandHandler> logger;
        private readonly IEncryptionService encryptionService;
        public CreateNoteCommandHandler(INoteRepository noteRepository, ILogger<CreateNoteCommandHandler> logger, IEncryptionService encryptionService)
        {
            this.noteRepository = noteRepository;
            this.logger = logger;
            this.encryptionService = encryptionService;
        }

        public async Task<CreateNoteCommandResponse> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateNoteCommandValidator(noteRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateNoteCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var encryptedNoteContent = encryptionService.Encrypt(request.NoteContent);

            var note = Note.Create(request.PatientId, encryptedNoteContent, request.NoteDate);
            if (note.IsSuccess)
            {
                var result = noteRepository.AddAsync(note.Value);
                return new CreateNoteCommandResponse()
                {
                    Success = true,
                    Note = new CreateNoteDto()
                    {
                        NoteId = note.Value.NoteId,
                        PatientId = note.Value.PatientId,
                        NoteContent = note.Value.NoteContent,
                        NoteDate = note.Value.NoteDate
                    }
                };
            }
            return new CreateNoteCommandResponse()
            {
                Success = false,
                ValidationsErrors = new List<string>() { note.Error }
            };
        }
    }
}
