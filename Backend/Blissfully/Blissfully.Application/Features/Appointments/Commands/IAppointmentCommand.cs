namespace Blissfully.Application.Features.Appointments.Commands
{
    public class IAppointmentCommand
    {
        public Guid PatientId { get; set; }
        public Guid TherapistId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
