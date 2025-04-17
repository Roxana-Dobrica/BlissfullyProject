namespace Blissfully.Application.Features
{
    public class PatientTestAnswerDto
    {
        public Guid PatientTestAnswerId { get; set; }
        public Guid TestId { get; set; }
        public Guid TestQuestionId { get; set; }
        public Guid PatientId { get; set; }
        public List<string> Answer { get; set; }
    }
}
