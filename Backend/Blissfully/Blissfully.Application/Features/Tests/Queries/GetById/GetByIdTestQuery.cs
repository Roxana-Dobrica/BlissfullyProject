using MediatR;

namespace Blissfully.Application.Features.Tests.Queries.GetById
{
    public record GetByIdTestQuery(Guid Id) : IRequest<TestDto>;
}
