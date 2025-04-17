using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Materials.Commands.CreateMaterial
{
    public class CreateMaterialCommandResponse : BaseResponse
    {
        public CreateMaterialCommandResponse() : base()
        {
        }
        public CreateMaterialDto Material { get; set; } = default!;
    }
}
