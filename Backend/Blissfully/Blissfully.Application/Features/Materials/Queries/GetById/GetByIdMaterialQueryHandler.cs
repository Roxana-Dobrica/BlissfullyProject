using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Materials.Queries.GetById
{
    public class GetByIdMaterialQueryHandler : IRequestHandler<GetByIdMaterialQuery, MaterialDto>
    {
        private readonly IMaterialRepository repository;

        public GetByIdMaterialQueryHandler(IMaterialRepository repository)
        {
            this.repository = repository;
        }

        public async Task<MaterialDto> Handle(GetByIdMaterialQuery request, CancellationToken cancellationToken)
        {
            var Material = await repository.FindByIdAsync(request.Id);
            if (Material.IsSuccess)
            {
                return new MaterialDto
                {
                    MaterialId = Material.Value.MaterialId,
                    UserId = Material.Value.UserId,
                    MaterialTitle = Material.Value.MaterialTitle,
                    MaterialUrl = Material.Value.MaterialUrl,
                    MaterialDateAdded = Material.Value.MaterialDateAdded.Date,
                    MaterialDescription = Material.Value.MaterialDescription,
                    Category = Material.Value.Category,
                    AddedByDoctorId = Material.Value.AddedByDoctorId,
                    IsFavorite = Material.Value.IsFavorite
                };
            }
            return new MaterialDto();
        }
    }
}
