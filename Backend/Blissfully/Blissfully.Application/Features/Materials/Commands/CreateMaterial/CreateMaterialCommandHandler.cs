using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.Materials.Commands.CreateMaterial
{
    public class CreateMaterialCommandHandler : IRequestHandler<CreateMaterialCommand, CreateMaterialCommandResponse>
    {
        private readonly IMaterialRepository materialRepository;
        private readonly ILogger<CreateMaterialCommandHandler> logger;

        public CreateMaterialCommandHandler(IMaterialRepository materialRepository, ILogger<CreateMaterialCommandHandler> logger)
        {
            this.materialRepository = materialRepository;
            this.logger = logger;
        }

        public async Task<CreateMaterialCommandResponse> Handle(CreateMaterialCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateMaterialCommandValidator(materialRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateMaterialCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var material = Material.Create(request.UserId, request.MaterialTitle, request.MaterialUrl, request.Category);
            if (material.IsSuccess)
            {
#pragma warning disable CS8604 // Possible null reference argument.
                material.Value.AttachDescription(request.MaterialDescription);
#pragma warning restore CS8604 // Possible null reference argument.
                material.Value.SetAddedByDoctor(request.AddedByDoctorId);

                var result = materialRepository.AddAsync(material.Value);
                return new CreateMaterialCommandResponse()
                {
                    Success = true,
                    Material = new CreateMaterialDto()
                    {
                        MaterialId = material.Value.MaterialId,
                        UserId = material.Value.UserId,
                        MaterialTitle = material.Value.MaterialTitle,
                        MaterialDescription = material.Value.MaterialDescription,
                        MaterialDateAdded = material.Value.MaterialDateAdded.Date,
                        MaterialUrl = material.Value.MaterialUrl,
                        Category = material.Value.Category,
                        AddedByDoctorId = material.Value.AddedByDoctorId,
                        IsFavorite = material.Value.IsFavorite
                    }
                };
            }
            return new CreateMaterialCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { material.Error }
            };
        }
    }
}
