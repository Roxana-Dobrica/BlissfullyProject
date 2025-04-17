using MediatR;

namespace Blissfully.Application.Features.Activities.Commands.UpdateActivity
{
    public class UpdateActivityCommand : IActivityCommand, IRequest<UpdateActivityCommandResponse>
    {
        public Guid ActivityId { get; set; } = default!;
    }
}
