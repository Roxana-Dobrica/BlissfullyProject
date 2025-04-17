namespace Blissfully.Application.Features.Tests.Commands.CreateTest
{
    public class CreateTestDto
    {
        public Guid TestId { get; set; }
        public string TestTitle { get; set; } = string.Empty;
        public Guid TherapistId { get; set; }
    }
}
