namespace Blissfully.Application.Features.TestTexts.Commands
{
    public class ITestTextCommand
    {
        public Guid TestTextId { get; set; }
        public Guid TestId { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
