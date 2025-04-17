namespace Blissfully.Application.Features.PatientTherapist.Commands
{
    public class IPatientTherapistCommand
    {
        public Guid PatientTherapistId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TherapistId { get; set; }
    }
}
