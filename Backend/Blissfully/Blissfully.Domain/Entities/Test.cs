using Blissfully.Domain.Common;

namespace Blissfully.Domain.Entities
{
    public class Test : AuditableEntity
    {
        private Test(string testTitle, Guid therapistId)
        {
            TestId = Guid.NewGuid();
            TherapistId = therapistId;
            TestTitle = testTitle;
        }
        public Guid TestId { get; private set; }
        public Guid TherapistId { get; private set; }
        public string TestTitle { get; private set; } = string.Empty;

        public static Result<Test> Create(string testTitle, Guid therapistId)
        {
            if (string.IsNullOrWhiteSpace(testTitle))
            {
                return Result<Test>.Failure("Test title cannot be empty");
            }
            return Result<Test>.Success(new Test(testTitle, therapistId));
        }
    }
}
