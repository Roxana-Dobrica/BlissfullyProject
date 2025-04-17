using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Commands.DeleteJournalEntry
{
    public class DeleteJournalEntryCommandHandler : IRequestHandler<DeleteJournalEntryCommand, DeleteJournalEntryCommandResponse>
    {
        private readonly IJournalEntryRepository repository;
        public DeleteJournalEntryCommandHandler(IJournalEntryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteJournalEntryCommandResponse> Handle(DeleteJournalEntryCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteJournalEntryCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteJournalEntryCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    JournalEntry = new DeleteJournalEntryDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var JournalEntry = await repository.FindByIdAsync(request.JournalEntryId);
            if (JournalEntry.IsSuccess)
            {
                await repository.DeleteAsync(request.JournalEntryId);
                return new DeleteJournalEntryCommandResponse
                {
                    Success = true,
                    JournalEntry = new DeleteJournalEntryDto
                    {
                        response = "Journal Entry Deleted Successfully"
                    }
                };
            }
            return new DeleteJournalEntryCommandResponse
            {
                Success = false,
                JournalEntry = new DeleteJournalEntryDto
                {
                    response = "Journal Entry Not Found"
                }
            };
        }
    }  
}
