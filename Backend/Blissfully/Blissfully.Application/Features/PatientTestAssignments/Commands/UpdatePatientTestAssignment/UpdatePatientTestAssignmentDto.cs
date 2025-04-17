namespace Blissfully.Application.Features.PatientTestAssignments.Commands.UpdatePatientTestAssignment
{
    public class UpdatePatientTestAssignmentDto
    {
        public Guid PatientTestAssignmentId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TestId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
