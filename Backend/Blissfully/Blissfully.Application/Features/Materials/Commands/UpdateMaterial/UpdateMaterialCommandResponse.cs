using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Materials.Commands.UpdateMaterial
{
    public class UpdateMaterialCommandResponse : BaseResponse
    {
        public UpdateMaterialCommandResponse() : base()
        {
        }

        public UpdateMaterialDto Material { get; set; } = default!;
    }
}
