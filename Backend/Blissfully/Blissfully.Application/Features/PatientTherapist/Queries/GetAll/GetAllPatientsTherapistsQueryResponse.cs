namespace Blissfully.Application.Features.PatientTherapist.Queries.GetAll
{
    public class GetAllPatientsTherapistsQueryResponse
    {
        public List<PatientTherapistDto> PatientsTherapists { get; set; } = default!;
    }
}
