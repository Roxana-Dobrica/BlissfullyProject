using MediatR;

namespace Blissfully.Application.Features.Materials.Commands.CreateMaterial
{
    public class CreateMaterialCommand : IMaterialCommand, IRequest<CreateMaterialCommandResponse>
    {
    }
}
