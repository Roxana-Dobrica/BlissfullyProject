namespace Blissfully.Application.Features.Tests.Commands
{
    public class ITestCommand
    {
        public Guid TestId { get; set; }
        public string TestTitle { get; set; } = string.Empty;
        public Guid TherapistId { get; set; }
    }
}
