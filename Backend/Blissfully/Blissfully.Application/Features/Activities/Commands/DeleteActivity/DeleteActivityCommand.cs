using MediatR;

namespace Blissfully.Application.Features.Activities.Commands.DeleteActivity
{
    public class DeleteActivityCommand : IRequest<DeleteActivityCommandResponse>
    {
        public Guid ActivityId { get; set; } = default!;
    }
}
