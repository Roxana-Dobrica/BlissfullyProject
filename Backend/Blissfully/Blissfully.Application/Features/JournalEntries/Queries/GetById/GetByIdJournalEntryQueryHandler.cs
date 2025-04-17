using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using MediatR;
using Newtonsoft.Json.Linq;
using System.Text;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetById
{
    public class GetByIdJournalEntryQueryHandler : IRequestHandler<GetByIdJournalEntryQuery, JournalEntryDto>
    {
        private readonly IJournalEntryRepository repository;
        private readonly IEncryptionService encryptionService;

        public GetByIdJournalEntryQueryHandler(IJournalEntryRepository repository, IEncryptionService encryptionService)
        {
            this.repository = repository;
            this.encryptionService = encryptionService;
        }

        public async Task<JournalEntryDto> Handle(GetByIdJournalEntryQuery request, CancellationToken cancellationToken)
        {
            var JournalEntry = await repository.FindByIdAsync(request.Id);
            if (JournalEntry.IsSuccess)
            {
                return new JournalEntryDto
                {
                    JournalEntryId = JournalEntry.Value.JournalEntryId,
                    UserId = JournalEntry.Value.UserId,
                    EntryDate = JournalEntry.Value.EntryDate.Date,
                    EntryTitle = encryptionService.Decrypt(JournalEntry.Value.EntryTitle),
                    EntryContent = encryptionService.Decrypt(JournalEntry.Value.EntryContent),
                    Feelings = JournalEntry.Value.Feelings,
                    ImageUrl = JournalEntry.Value.ImageUrl
                };
            }
            return new JournalEntryDto();
        }
    }
}
