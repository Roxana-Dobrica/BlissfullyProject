namespace Blissfully.Application.Features.Appointments.Queries.GetByTherapistId
{
    public class GetAppointmentByTherapistIdQueryResponse
    {
        public List<AppointmentDto> Appointments { get; set; } = default!;
    }
}
