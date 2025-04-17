using Blissfully.Application.Contracts;
using Blissfully.Application.Features.JournalEntries.Queries.GetAll;
using Blissfully.Application.Persistence;
using MediatR;
using System.Text;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetAll
{
    public class GetAllJournalEntriesQueryHandler : IRequestHandler<GetAllJournalEntriesQuery, GetAllJournalEntriesQueryResponse>
    {
        private readonly IJournalEntryRepository repository;
        private readonly IEncryptionService encryptionService;

        public GetAllJournalEntriesQueryHandler(IJournalEntryRepository repository, IEncryptionService encryptionService)
        {
            this.repository = repository;
            this.encryptionService = encryptionService;
        }

        public async Task<GetAllJournalEntriesQueryResponse> Handle(GetAllJournalEntriesQuery request, CancellationToken cancellationToken)
        {
            GetAllJournalEntriesQueryResponse response = new();
            var result = await repository.GetAllAsync();
            if (result.IsSuccess)
            {
                response.JournalEntries = result.Value.Select(e => new JournalEntryDto
                {
                    JournalEntryId = e.JournalEntryId,
                    UserId = e.UserId,
                    EntryDate = e.EntryDate.Date,
                    EntryTitle = encryptionService.Decrypt(e.EntryTitle),
                    EntryContent = encryptionService.Decrypt(e.EntryContent),
                    Feelings = e.Feelings,
                    ImageUrl = e.ImageUrl
                }).ToList();
            }
            return response;
        }
    }
}
