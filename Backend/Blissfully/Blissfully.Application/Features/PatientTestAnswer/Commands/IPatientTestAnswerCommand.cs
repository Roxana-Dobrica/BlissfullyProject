namespace Blissfully.Application.Features.PatientTestAnswer.Commands
{
    public class IPatientTestAnswerCommand
    {
        public Guid PatientTestAnswerId { get; set; }
        public Guid TestId { get; set; }
        public Guid TestQuestionId { get; set; }
        public Guid PatientId { get; set; }
        public List<string> Answer { get; set; }
    }
}
