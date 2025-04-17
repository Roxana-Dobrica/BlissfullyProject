using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class PatientTestAnswer : AuditableEntity
    {
        private PatientTestAnswer(Guid testId, Guid testQuestionId, Guid patientId, List<string> answer)
        {
            PatientTestAnswerId = Guid.NewGuid();
            TestId = testId;
            TestQuestionId = testQuestionId;
            PatientId = patientId;
            Answer = answer;
        }
        public Guid PatientTestAnswerId { get; private set; }
        public Guid TestId { get; private set; }
        public Guid TestQuestionId { get; private set; }
        public Guid PatientId { get; private set; }
        public List<string> Answer { get; private set; } 

        public static Result<PatientTestAnswer> Create(Guid testId, Guid testQuestionId, Guid patientId, List<string> answer)
        {
            if(testId == Guid.Empty)
            {
                return Result<PatientTestAnswer>.Failure("TestId is required");
            }
            if (testQuestionId == Guid.Empty)
            {
                return Result<PatientTestAnswer>.Failure("TestQuestionId is required");
            }
            if (patientId == Guid.Empty)
            {
                return Result<PatientTestAnswer>.Failure("PatientId is required");
            }
            if (answer == null || !answer.Any())
            {
                return Result<PatientTestAnswer>.Failure("Answer is required");
            }
            return Result<PatientTestAnswer>.Success(new PatientTestAnswer(testId, testQuestionId, patientId, answer));
        }
    }
}
