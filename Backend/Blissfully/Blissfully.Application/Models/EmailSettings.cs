namespace Blissfully.Application.Models
{
    public class EmailSettings
    {
        public string ApiKey { get; init; } = default!;
        public string FromAddress { get; init; } = default!;
        public string FromName { get; init; } = default!;
        public string SmtpServer { get; set; } = default!;
        public int SmtpPort { get; set; }
        public string SmtpUsername { get; set; } = default!;
        public string SmtpPassword { get; set; } = default!;
        public bool EnableSsl { get; set; }

    }
}
