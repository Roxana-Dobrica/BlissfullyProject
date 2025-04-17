namespace Blissfully.Application.Features.PatientTestAssignments.Commands
{
    public class IPatientTestAssignmentCommand
    {
        public Guid PatientTestAssignmentId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TestId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
