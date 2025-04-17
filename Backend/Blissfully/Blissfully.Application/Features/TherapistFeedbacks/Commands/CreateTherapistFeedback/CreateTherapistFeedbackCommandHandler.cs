using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.CreateTherapistFeedback
{
    public class CreateTherapistFeedbackCommandHandler : IRequestHandler<CreateTherapistFeedbackCommand, CreateTherapistFeedbackCommandResponse>
    {
        private readonly ITherapistFeedbackRepository therapistFeedbackRepository;
        private readonly ILogger<CreateTherapistFeedbackCommandHandler> logger;
        public CreateTherapistFeedbackCommandHandler(ITherapistFeedbackRepository therapistFeedbackRepository, ILogger<CreateTherapistFeedbackCommandHandler> logger)
        {
            this.therapistFeedbackRepository = therapistFeedbackRepository;
            this.logger = logger;
        }

        public async Task<CreateTherapistFeedbackCommandResponse> Handle(CreateTherapistFeedbackCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateTherapistFeedbackCommandValidator(therapistFeedbackRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateTherapistFeedbackCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var therapistFeedback = TherapistFeedback.Create(request.TherapistId, request.UserId, request.Feedback, request.FeedbackDate);
            if (therapistFeedback.IsSuccess)
            {
                var result = therapistFeedbackRepository.AddAsync(therapistFeedback.Value);
                return new CreateTherapistFeedbackCommandResponse()
                {
                    Success = true,
                    TherapistFeedback = new CreateTherapistFeedbackDto()
                    {
                        TherapistFeedbackId = therapistFeedback.Value.TherapistFeedbackId,
                        TherapistId = therapistFeedback.Value.TherapistId,
                        UserId = therapistFeedback.Value.UserId,
                        Feedback = therapistFeedback.Value.Feedback,
                        FeedbackDate = therapistFeedback.Value.FeedbackDate
                    }
                };
            }
            return new CreateTherapistFeedbackCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { therapistFeedback.Error }
            };
        }
    }
}
