using MediatR;

namespace Blissfully.Application.Features.Activities.Queries.GetById
{
    public record GetByIdActivityQuery(Guid Id) : IRequest<ActivityDto>;
   
}
