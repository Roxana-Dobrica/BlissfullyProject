using Blissfully.Application.Contracts;
using Blissfully.Application.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;


namespace Blissfully.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<EmailSettings> _options;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> options, ILogger<EmailService> logger)
        {
            _options = options;
            _logger = logger;
        }

        public async Task<bool> SendEmailAsync(Mail email)
        {
            try
            {
                var emailSettings = _options.Value;

                using (var client = new SmtpClient(emailSettings.SmtpServer, emailSettings.SmtpPort))
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(emailSettings.SmtpUsername, emailSettings.SmtpPassword);
                    client.EnableSsl = emailSettings.EnableSsl;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(emailSettings.FromAddress, emailSettings.FromName),
                        Subject = email.Subject,
                        Body = email.Body,
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(email.To);

                    await client.SendMailAsync(mailMessage);

                    _logger.LogInformation("Email sent successfully.");
                    return true;
                }
            }
            catch (SmtpException smtpEx)
            {
                _logger.LogError($"SMTP error sending email: {smtpEx.StatusCode} - {smtpEx.Message}");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending email: {ex.Message}");
                return false;
            }
        }
    }
}

