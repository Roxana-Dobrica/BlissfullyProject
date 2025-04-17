using MediatR;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.DeleteTherapistFeedback
{
    public class DeleteTherapistFeedbackCommand : IRequest<DeleteTherapistFeedbackCommandResponse>
    {
        public Guid TherapistFeedbackId { get; set; } = default!;
    }
}
