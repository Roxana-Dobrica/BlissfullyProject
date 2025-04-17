namespace Blissfully.Application.Features
{
    public class PatientTherapistDto
    {
        public Guid PatientTherapistId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TherapistId { get; set; }
    }
}
