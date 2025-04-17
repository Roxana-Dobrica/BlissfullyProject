namespace Blissfully.Application.Features.Appointments.Queries.GetByPatientId
{
    public class GetAppointmentByPatientIdQueryResponse
    {
        public List<AppointmentDto> Appointments { get; set; } = default!;
    }
}
