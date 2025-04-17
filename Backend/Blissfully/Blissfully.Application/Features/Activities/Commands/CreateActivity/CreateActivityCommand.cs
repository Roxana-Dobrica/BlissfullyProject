using MediatR;

namespace Blissfully.Application.Features.Activities.Commands.CreateActivity
{
    public class CreateActivityCommand : IActivityCommand, IRequest<CreateActivityCommandResponse>
    {

    }
}
