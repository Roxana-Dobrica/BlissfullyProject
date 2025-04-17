using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Materials.Commands.DeleteMaterial
{
    public class DeleteMaterialCommandHandler : IRequestHandler<DeleteMaterialCommand, DeleteMaterialCommandResponse>
    {
        private readonly IMaterialRepository repository;
        public DeleteMaterialCommandHandler(IMaterialRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteMaterialCommandResponse> Handle(DeleteMaterialCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteMaterialCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                return new DeleteMaterialCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    Material = new DeleteMaterialDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var Material = await repository.FindByIdAsync(request.MaterialId);
            if (Material.IsSuccess)
            {
                await repository.DeleteAsync(request.MaterialId);
                return new DeleteMaterialCommandResponse
                {
                    Success = true,
                    Material = new DeleteMaterialDto
                    {
                        response = "Material Deleted Successfully"
                    }
                };
            }
            return new DeleteMaterialCommandResponse
            {
                Success = false,
                Material = new DeleteMaterialDto
                {
                    response = "Material Not Found"
                }
            };
        }
    }
}
