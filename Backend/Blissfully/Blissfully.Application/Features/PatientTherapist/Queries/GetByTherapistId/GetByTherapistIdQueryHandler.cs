using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Queries.GetByTherapistId
{
    public class GetByTherapistIdQueryHandler : IRequestHandler<GetByTherapistIdQuery, GetByTherapistIdQueryResponse>
    {
        private readonly IPatientTherapistRepository repository;

        public GetByTherapistIdQueryHandler(IPatientTherapistRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetByTherapistIdQueryResponse> Handle(GetByTherapistIdQuery request, CancellationToken cancellationToken)
        {
            GetByTherapistIdQueryResponse response = new();
            var result = await repository.FindByTherapistIdAsync(request.therapistId);
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
