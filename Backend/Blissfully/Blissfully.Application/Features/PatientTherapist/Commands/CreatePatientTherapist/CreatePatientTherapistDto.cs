namespace Blissfully.Application.Features.PatientTherapist.Commands.CreatePatientTherapist
{
    public class CreatePatientTherapistDto
    {
        public Guid PatientTherapistId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TherapistId { get; set; }
    }
}
