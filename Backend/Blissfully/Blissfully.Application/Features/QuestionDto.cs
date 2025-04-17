using Blissfully.Domain.Common;

namespace Blissfully.Application.Features
{
    public class QuestionDto
    {
        public Guid TestQuestionId { get; set; }
        public Guid TestId { get; set; }
        public string Question { get; set; } = string.Empty;
        public QuestionType Type { get; set; }
        public List<string>? Answers { get; set; }
        public int Order { get; set; }
    }
}
