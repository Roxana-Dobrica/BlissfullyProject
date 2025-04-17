using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.CreateTherapistFeedback
{
    public class CreateTherapistFeedbackCommandResponse : BaseResponse
    {
        public CreateTherapistFeedbackCommandResponse() : base()
        {
        }
        public CreateTherapistFeedbackDto TherapistFeedback { get; set; } = default!;
    }
}
