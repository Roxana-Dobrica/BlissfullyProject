using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Queries.GetByPatientId
{
    public class GetByPatientIdQueryHandler : IRequestHandler<GetByPatientIdQuery, PatientTherapistDto>
    {
        private readonly IPatientTherapistRepository repository;
        public GetByPatientIdQueryHandler(IPatientTherapistRepository repository)
        {
            this.repository = repository;
        }

        public async Task<PatientTherapistDto> Handle(GetByPatientIdQuery request, CancellationToken cancellationToken)
        {
            var PatientTherapist = await repository.FindByPatientIdAsync(request.Id);
            if (PatientTherapist.IsSuccess)
            {
                return new PatientTherapistDto
                {
                    PatientTherapistId = PatientTherapist.Value.PatientTherapistId,
                    PatientId = PatientTherapist.Value.PatientId,
                    TherapistId = PatientTherapist.Value.TherapistId
                };
            }
            return new PatientTherapistDto();
        }
    }
}
