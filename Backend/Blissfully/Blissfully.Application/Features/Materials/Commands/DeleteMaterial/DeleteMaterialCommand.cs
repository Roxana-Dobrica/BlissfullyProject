using MediatR;

namespace Blissfully.Application.Features.Materials.Commands.DeleteMaterial
{
    public class DeleteMaterialCommand : IRequest<DeleteMaterialCommandResponse>
    {
        public Guid MaterialId { get; set; } = default!;
    }
}
