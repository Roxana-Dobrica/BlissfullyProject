using Blissfully.Application.Features.Materials.Queries.GetAll;
using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Materials.Queries.GetAll
{
    public class GetAllMaterialsQueryHandler : IRequestHandler<GetAllMaterialsQuery, GetAllMaterialsQueryResponse>
    {
        private readonly IMaterialRepository repository;

        public GetAllMaterialsQueryHandler(IMaterialRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetAllMaterialsQueryResponse> Handle(GetAllMaterialsQuery request, CancellationToken cancellationToken)
        {
            GetAllMaterialsQueryResponse response = new();
            var result = await repository.GetAllAsync();
            if (result.IsSuccess)
            {
                response.Materials = result.Value.Select(a => new MaterialDto
                {
                    MaterialId = a.MaterialId,
                    UserId = a.UserId,
                    MaterialTitle = a.MaterialTitle,
                    MaterialUrl = a.MaterialUrl,
                    MaterialDateAdded = a.MaterialDateAdded.Date,
                    MaterialDescription = a.MaterialDescription,
                    Category = a.Category,
                    AddedByDoctorId = a.AddedByDoctorId,
                    IsFavorite = a.IsFavorite
                }).ToList();
            }
            return response;
        }
    }
}
