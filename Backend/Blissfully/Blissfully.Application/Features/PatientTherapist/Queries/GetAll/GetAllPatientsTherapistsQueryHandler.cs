using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Queries.GetAll
{
    public class GetAllPatientsTherapistsQueryHandler : IRequestHandler<GetAllPatientsTherapistsQuery, GetAllPatientsTherapistsQueryResponse>
    {
        private readonly IPatientTherapistRepository repository;

        public GetAllPatientsTherapistsQueryHandler(IPatientTherapistRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetAllPatientsTherapistsQueryResponse> Handle(GetAllPatientsTherapistsQuery request, CancellationToken cancellationToken)
        {
            GetAllPatientsTherapistsQueryResponse response = new();
            var result = await repository.GetAllAsync();
            if (result.IsSuccess)
            {
                response.PatientsTherapists = result.Value.Select(a => new PatientTherapistDto
                {
                    PatientTherapistId = a.PatientTherapistId,
                    PatientId = a.PatientId,
                    TherapistId = a.TherapistId
                }).ToList();
            }
            return response;
        }
    }
}
