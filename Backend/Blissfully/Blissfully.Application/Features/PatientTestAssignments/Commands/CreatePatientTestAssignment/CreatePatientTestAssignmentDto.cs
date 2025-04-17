namespace Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment
{
    public class CreatePatientTestAssignmentDto
    {
        public Guid PatientTestAssignmentId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TestId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
