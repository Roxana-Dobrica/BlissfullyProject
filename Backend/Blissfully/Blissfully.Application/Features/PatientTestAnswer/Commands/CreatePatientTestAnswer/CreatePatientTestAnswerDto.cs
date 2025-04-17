namespace Blissfully.Application.Features.PatientTestAnswer.Commands.CreatePatientTestAnswer
{
    public class CreatePatientTestAnswerDto
    {
        public Guid PatientTestAnswerId { get; set; }
        public Guid TestId { get; set; }
        public Guid TestQuestionId { get; set; }
        public Guid PatientId { get; set; }
        public List<string> Answer { get; set; }
    }
}
