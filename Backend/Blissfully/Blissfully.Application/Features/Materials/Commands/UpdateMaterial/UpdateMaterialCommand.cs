using MediatR;

namespace Blissfully.Application.Features.Materials.Commands.UpdateMaterial
{
    public class UpdateMaterialCommand : IMaterialCommand, IRequest<UpdateMaterialCommandResponse>
    {
        public Guid MaterialId { get; set; }
    }
}
