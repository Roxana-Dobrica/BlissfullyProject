using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.DeleteTherapistFeedback
{
    public class DeleteTherapistFeedbackCommandResponse : BaseResponse
    {
        public DeleteTherapistFeedbackCommandResponse() : base()
        {
        }

        public DeleteTherapistFeedbackDto TherapistFeedback { get; set; }
    }
}
