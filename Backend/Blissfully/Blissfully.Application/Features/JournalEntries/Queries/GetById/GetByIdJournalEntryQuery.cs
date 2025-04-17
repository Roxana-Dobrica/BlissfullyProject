using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetById
{
    public record GetByIdJournalEntryQuery(Guid Id) : IRequest<JournalEntryDto>;
}
