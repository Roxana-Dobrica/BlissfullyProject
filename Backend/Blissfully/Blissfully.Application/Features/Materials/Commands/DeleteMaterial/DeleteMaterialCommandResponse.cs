using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Materials.Commands.DeleteMaterial
{
    public class DeleteMaterialCommandResponse : BaseResponse
    {
        public DeleteMaterialCommandResponse() : base()
        {
        }

        public DeleteMaterialDto Material { get; set; }
    }
}
