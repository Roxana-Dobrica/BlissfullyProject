namespace Blissfully.Application.Features.PatientTherapist.Queries.GetByTherapistId
{
    public class GetByTherapistIdQueryResponse
    {
        public List<PatientTherapistDto> PatientsTherapists { get; set; } = default!;
    }
}
