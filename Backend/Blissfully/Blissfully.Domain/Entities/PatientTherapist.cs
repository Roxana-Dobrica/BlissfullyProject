using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class PatientTherapist : AuditableEntity
    {
        private PatientTherapist(Guid patientId, Guid therapistId)
        {
            PatientTherapistId = Guid.NewGuid();
            PatientId = patientId;
            TherapistId = therapistId;
        }
        public Guid PatientTherapistId { get; private set; }
        public Guid PatientId { get; private set; }
        public Guid TherapistId { get; private set; }

        public static Result<PatientTherapist> Create(Guid patientId, Guid therapistId)
        {
            return Result<PatientTherapist>.Success(new PatientTherapist(patientId, therapistId));
        }
    }
}
