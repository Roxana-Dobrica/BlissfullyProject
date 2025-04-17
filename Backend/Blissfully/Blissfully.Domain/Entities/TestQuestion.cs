using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class TestQuestion : AuditableEntity
    {
        private TestQuestion(Guid testId, string question, QuestionType type, List<string>? answers, int order)
        {
            TestQuestionId = Guid.NewGuid();
            TestId = testId;
            Question = question;
            Type = type;
            Answers = answers;
            Order = order;
        }
        public Guid TestQuestionId { get; private set; }
        public Guid TestId { get; private set; }
        public string Question { get; private set; } = string.Empty;
        public QuestionType Type { get; private set; }
        public List<string>? Answers { get; private set; }
        public int Order { get; private set; }

        public static Result<TestQuestion> Create(Guid testId, string question, QuestionType type, List<string>? answers, int order)
        {
            if (string.IsNullOrWhiteSpace(question))
            {
                return Result<TestQuestion>.Failure("Question is required");
            }
            return Result<TestQuestion>.Success(new TestQuestion(testId, question, type, answers, order));
        }
    }
}
