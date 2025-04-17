using MediatR;

namespace Blissfully.Application.Features.TherapistFeedbacks.Commands.CreateTherapistFeedback
{
    public class CreateTherapistFeedbackCommand : ITherapistFeedbackCommand, IRequest<CreateTherapistFeedbackCommandResponse>
    {
    }
}
