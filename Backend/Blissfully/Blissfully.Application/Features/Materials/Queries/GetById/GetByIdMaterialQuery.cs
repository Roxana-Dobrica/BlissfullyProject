using MediatR;

namespace Blissfully.Application.Features.Materials.Queries.GetById
{
    public record GetByIdMaterialQuery(Guid Id) : IRequest<MaterialDto>;
}
