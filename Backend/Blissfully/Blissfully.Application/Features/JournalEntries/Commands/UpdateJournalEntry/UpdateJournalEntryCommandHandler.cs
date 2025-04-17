using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Commands.UpdateJournalEntry
{
    public class UpdateJournalEntryCommandHandler : IRequestHandler<UpdateJournalEntryCommand, UpdateJournalEntryCommandResponse>
    {
        private readonly IJournalEntryRepository repository;

        public UpdateJournalEntryCommandHandler(IJournalEntryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<UpdateJournalEntryCommandResponse> Handle(UpdateJournalEntryCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateJournalEntryCommandValidator(repository);
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                return new UpdateJournalEntryCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList()
                };
            }

            var journalEntry = await repository.FindByIdAsync(request.JournalEntryId);
            if (journalEntry.IsSuccess)
            {

                journalEntry.Value.Update(request.EntryDate, request.EntryContent, request.Feelings, request.ImageUrl);
                await repository.UpdateAsync(journalEntry.Value);
                return new UpdateJournalEntryCommandResponse
                {
                    Success = true,
                    JournalEntry = new UpdateJournalEntryDto
                    {
                        JournalEntryId = journalEntry.Value.JournalEntryId,
                        UserId = journalEntry.Value.UserId,
                        EntryDate = journalEntry.Value.EntryDate.Date,
                        EntryTitle = journalEntry.Value.EntryTitle,
                        EntryContent = journalEntry.Value.EntryContent,
                        Feelings = journalEntry.Value.Feelings,
                        ImageUrl = journalEntry.Value.ImageUrl

                    }
                };
            }
            return new UpdateJournalEntryCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string> { "JournalEntry Not Found" }
            };
        }
    }
}
