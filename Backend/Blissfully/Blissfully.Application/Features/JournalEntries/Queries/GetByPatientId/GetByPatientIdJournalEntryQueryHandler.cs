using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using MediatR;
using System.Text;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetByPatientId
{
    public class GetByPatientIdJournalEntryQueryHandler : IRequestHandler<GetByPatientIdJournalEntryQuery, GetByPatientIdJournalEntryQueryResponse>
    {
        private readonly IJournalEntryRepository repository;
        private readonly IEncryptionService encryptionService;
        public GetByPatientIdJournalEntryQueryHandler(IJournalEntryRepository repository, IEncryptionService encryptionService)
        {
            this.repository = repository;
            this.encryptionService = encryptionService;
        }

        public async Task<GetByPatientIdJournalEntryQueryResponse> Handle(GetByPatientIdJournalEntryQuery request, CancellationToken cancellationToken)
        {
            GetByPatientIdJournalEntryQueryResponse response = new();
            var result = await repository.FindByPatientIdAsync(request.patientId);
            if (result.IsSuccess)
            {
                response.JournalEntries = result.Value.Select(a => new JournalEntryDto
                {
                    JournalEntryId = a.JournalEntryId,
                    UserId = a.UserId,
                    EntryDate = a.EntryDate.Date,
                    EntryTitle = encryptionService.Decrypt(a.EntryTitle),
                    EntryContent = encryptionService.Decrypt(a.EntryContent),
                    Feelings = a.Feelings,
                    ImageUrl = a.ImageUrl
                }).ToList();
            }
            return response;
        }
    }
}
