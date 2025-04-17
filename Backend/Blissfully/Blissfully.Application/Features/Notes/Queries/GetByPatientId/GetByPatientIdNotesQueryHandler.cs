using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Notes.Queries.GetByPatientId
{
    public class GetByPatientIdNotesQueryHandler : IRequestHandler<GetByPatientIdNotesQuery, GetByPatientIdNotesQueryResponse>
    {
        private readonly INoteRepository repository;
        private readonly IEncryptionService encryptionService;

        public GetByPatientIdNotesQueryHandler(INoteRepository repository, IEncryptionService encryptionService)
        {
            this.repository = repository;
            this.encryptionService = encryptionService;
        }

        public async Task<GetByPatientIdNotesQueryResponse> Handle(GetByPatientIdNotesQuery request, CancellationToken cancellationToken)
        {
            GetByPatientIdNotesQueryResponse response = new();
            var result = await repository.FindByPatientIdAsync(request.patientId);
            if (result.IsSuccess)
            {
                response.Notes = result.Value.Select(a => new NoteDto
                {
                    NoteId = a.NoteId,
                    PatientId = a.PatientId,
                    NoteContent = encryptionService.Decrypt(a.NoteContent),
                    NoteDate = a.NoteDate
                }).ToList();
            }
            return response;    
        }
    }
}
