using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using MediatR;
using System.Text;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetPaged
{
    public class GetPagedJournalEntriesQueryHandler : IRequestHandler<GetPagedJournalEntriesQuery, GetPagedJournalEntriesQueryResponse>
    {
        private readonly IJournalEntryRepository repository;
        private readonly IEncryptionService encryptionService;

        public GetPagedJournalEntriesQueryHandler(IJournalEntryRepository repository, IEncryptionService encryptionService)
        {
            this.repository = repository;
            this.encryptionService = encryptionService;
        }

        public async Task<GetPagedJournalEntriesQueryResponse> Handle(GetPagedJournalEntriesQuery request, CancellationToken cancellationToken)
        {
            GetPagedJournalEntriesQueryResponse response = new();
            var result = await repository.GetPagedResponseAsync(request.Page, request.Size);
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
