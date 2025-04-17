using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Materials.Queries.GetByPatientIdAndType
{
    public class GetByPatientIdAndTypeMaterialQueryHandler : IRequestHandler<GetByPatientIdAndTypeMaterialQuery, GetByPatientIdAndTypeMaterialQueryResponse>
    {
        private readonly IMaterialRepository repository;

        public GetByPatientIdAndTypeMaterialQueryHandler(IMaterialRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetByPatientIdAndTypeMaterialQueryResponse> Handle(GetByPatientIdAndTypeMaterialQuery request, CancellationToken cancellationToken)
        {
            GetByPatientIdAndTypeMaterialQueryResponse response = new();
            var result = await repository.FindByPatientIdAndTypeAsync(request.patientId, request.type);
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
