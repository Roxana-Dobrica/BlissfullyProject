using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class Appointment : AuditableEntity
    {
        private Appointment(Guid patientId, Guid therapistId, DateTime appointmentDate, TimeSpan startTime, TimeSpan endTime)
        {
            AppointmentId = Guid.NewGuid();
            PatientId = patientId;
            TherapistId = therapistId;
            AppointmentDate = appointmentDate;
            StartTime = startTime;
            EndTime = endTime;
        }
        public Guid AppointmentId { get; private set; }
        public Guid PatientId { get; private set; }
        public Guid TherapistId { get; private set; }
        public DateTime AppointmentDate { get; private set; }
        public TimeSpan StartTime { get; private set; }
        public TimeSpan EndTime { get; private set; }

        public static Result<Appointment> Create(Guid patientId, Guid therapistId, DateTime appointmentDate, TimeSpan startTime, TimeSpan endTime)
        {
            if (patientId == Guid.Empty)
            {
                return Result<Appointment>.Failure("Patient is required");
            }
            if (appointmentDate == DateTime.MinValue)
            {
                return Result<Appointment>.Failure("Appointment date is required");
            }
            if (startTime == TimeSpan.Zero)
            {
                return Result<Appointment>.Failure("Start time is required");
            }
            if (endTime == TimeSpan.Zero)
            {
                return Result<Appointment>.Failure("End time is required");
            }
            if (startTime >= endTime)
            {
                return Result<Appointment>.Failure("Start time must be before end time");
            }
            return Result<Appointment>.Success(new Appointment(patientId, therapistId, appointmentDate, startTime, endTime));
        }
    }
}
