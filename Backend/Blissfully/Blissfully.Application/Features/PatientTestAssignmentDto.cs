namespace Blissfully.Application.Features
{
    public class PatientTestAssignmentDto
    {
        public Guid PatientTestAssignmentId { get; set; }
        public Guid PatientId { get; set; }
        public Guid TestId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
