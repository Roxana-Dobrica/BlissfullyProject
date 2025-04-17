using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class TestText : AuditableEntity
    {
        private TestText(Guid testId, string text, int order)
        {
            TestTextId = Guid.NewGuid();
            TestId = testId;
            Text = text;
            Order = order;
        }
        public Guid TestTextId { get; private set; }
        public Guid TestId { get; private set; }
        public string Text { get; private set; } = string.Empty;
        public int Order { get; private set; }

        public static Result<TestText> Create(Guid testId, string text, int order)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return Result<TestText>.Failure("Text is required");
            }
            return Result<TestText>.Success(new TestText(testId, text, order));
        }
    }
}
