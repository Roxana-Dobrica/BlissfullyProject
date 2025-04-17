namespace Blissfully.Application.Features.TestTexts.Commands.CreateTestTexts
{
    public class CreateTestTextDto
    {
        public Guid TestTextId { get; set; }
        public Guid TestId { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
