using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class PatientTestAssignment : AuditableEntity
    {
        private PatientTestAssignment(Guid patientId, Guid testId)
        {
            PatientTestAssignmentId = Guid.NewGuid();
            PatientId = patientId;
            TestId = testId;
            IsCompleted = false;
        }
        public Guid PatientTestAssignmentId { get; private set; }
        public Guid PatientId { get; private set; }
        public Guid TestId { get; private set; }
        public bool IsCompleted { get; private set; }

        public static Result<PatientTestAssignment> Create(Guid patientId, Guid testId)
        {
            if (patientId == Guid.Empty)
            {
                return Result<PatientTestAssignment>.Failure("Patient ID is required");
            }
            if (testId == Guid.Empty)
            {
                return Result<PatientTestAssignment>.Failure("Test ID is required");
            }
            return Result<PatientTestAssignment>.Success(new PatientTestAssignment(patientId, testId));
        }

        public void Update(Guid patientId, Guid testId, bool isCompleted)
        {
            if (patientId != Guid.Empty)
            {
                PatientId = patientId;
            }
            if (testId != Guid.Empty)
            {
                TestId = testId;
            }
            IsCompleted = isCompleted;
        }
    }
}
