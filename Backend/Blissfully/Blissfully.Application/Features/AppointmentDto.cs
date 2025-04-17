namespace Blissfully.Application.Features
{
    public class AppointmentDto
    {
        public Guid AppointmentId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TherapistId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
