using Blissfully.Domain.Entities;
using Blissfully.Application.Persistence;
using MediatR;
using Microsoft.Extensions.Logging;
using Blissfully.Application.Contracts;
using Newtonsoft.Json;
using System.Text;
using Google.Cloud.Translation.V2;

namespace Blissfully.Application.Features.JournalEntries.Commands.CreateJournalEntry
{
    public class CreateJournalEntryCommandHandler : IRequestHandler<CreateJournalEntryCommand, CreateJournalEntryCommandResponse>
    {
        private readonly IJournalEntryRepository JournalEntryRepository;
        private readonly ILogger<CreateJournalEntryCommandHandler> logger;
        private readonly IEncryptionService encryptionService;
        private readonly HttpClient client;

        public CreateJournalEntryCommandHandler(IJournalEntryRepository JournalEntryRepository, ILogger<CreateJournalEntryCommandHandler> logger, IEncryptionService encryptionService)
        {
            this.JournalEntryRepository = JournalEntryRepository;
            this.logger = logger;
            this.encryptionService = encryptionService;
            this.client = new HttpClient();
        }

        public async Task<CreateJournalEntryCommandResponse> Handle(CreateJournalEntryCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateJournalEntryCommandValidator(JournalEntryRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateJournalEntryCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var encryptedContent = encryptionService.Encrypt(request.EntryContent);
            var encryptedTitle = encryptionService.Encrypt(request.EntryTitle);

            var apiUrl = "http://localhost:5006/predict_sentiment";
            var jsonRequest = JsonConvert.SerializeObject(new { journal_entry = request.EntryContent });
            var httpContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync(apiUrl, httpContent);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                var prediction = JsonConvert.DeserializeObject<dynamic>(jsonResponse);

                var journalEntry = JournalEntry.Create(request.UserId, request.EntryDate, encryptedTitle, encryptedContent);
                if (journalEntry.IsSuccess)
                {
                    var feelingsInfo = new
                    {
                        emotion = prediction.emotion.ToString(),
                        confidence = float.Parse(prediction.confidence.ToString()),
                        sentiment = prediction.sentiment.ToString()
                    };
#pragma warning disable CS8604 // Possible null reference argument.
                    journalEntry.Value.AttachFeelings(new List<string> { feelingsInfo.emotion, feelingsInfo.confidence.ToString(), feelingsInfo.sentiment });
#pragma warning disable CS8604 // Possible null reference argument.
                    journalEntry.Value.AttachImageUrl(request.ImageUrl);

                    var result = JournalEntryRepository.AddAsync(journalEntry.Value);
                    return new CreateJournalEntryCommandResponse()
                    {
                        Success = true,
                        JournalEntry = new CreateJournalEntryDto()
                        {
                            JournalEntryId = journalEntry.Value.JournalEntryId,
                            UserId = journalEntry.Value.UserId,
                            EntryDate = journalEntry.Value.EntryDate.Date,
                            EntryTitle = journalEntry.Value.EntryTitle,
                            EntryContent = journalEntry.Value.EntryContent,
                            Feelings = journalEntry.Value.Feelings,
                            ImageUrl = journalEntry.Value.ImageUrl

                        }
                    };
                }
                return new CreateJournalEntryCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string>() { journalEntry.Error }
                };
            }
            else
            {
                logger.LogError("Error predicting sentiment: {StatusCode}", response.StatusCode);
                return new CreateJournalEntryCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string>() { "Error predicting sentiment" }
                };
            }
        }

    }
}