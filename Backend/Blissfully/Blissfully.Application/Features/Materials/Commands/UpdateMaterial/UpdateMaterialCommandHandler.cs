using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Materials.Commands.UpdateMaterial
{
    public class UpdateMaterialCommandHandler : IRequestHandler<UpdateMaterialCommand, UpdateMaterialCommandResponse>
    {
        private readonly IMaterialRepository materialRepository;

        public UpdateMaterialCommandHandler(IMaterialRepository materialRepository)
        {
            this.materialRepository = materialRepository;
        }

        public async Task<UpdateMaterialCommandResponse> Handle(UpdateMaterialCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateMaterialCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                return new UpdateMaterialCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList()
                };
            }

            var Material = await materialRepository.FindByIdAsync(request.MaterialId);
            if (Material.IsSuccess)
            {
                /*string materialTitle, string materialUrl, string materialDescription*/
                Material.Value.Update(request.MaterialTitle, request.MaterialUrl, request.MaterialDescription, request.IsFavorite);
                await materialRepository.UpdateAsync(Material.Value);
                return new UpdateMaterialCommandResponse
                {
                    Success = true,
                    Material = new UpdateMaterialDto()
                    {
                        MaterialId = Material.Value.MaterialId,
                        UserId = Material.Value.UserId,
                        MaterialTitle = Material.Value.MaterialTitle,
                        MaterialDescription = Material.Value.MaterialDescription,
                        MaterialDateAdded = Material.Value.MaterialDateAdded.Date,
                        MaterialUrl = Material.Value.MaterialUrl,
                        Category = Material.Value.Category,
                        AddedByDoctorId = Material.Value.AddedByDoctorId,
                        IsFavorite = Material.Value.IsFavorite
                    }
                };
            }
            return new UpdateMaterialCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string> { "Material Not Found" }
            };
        }
    }
}
