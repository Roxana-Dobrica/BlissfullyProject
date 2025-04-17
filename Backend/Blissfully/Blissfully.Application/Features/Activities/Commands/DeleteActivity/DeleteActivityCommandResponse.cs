using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Activities.Commands.DeleteActivity
{
    public class DeleteActivityCommandResponse : BaseResponse
    {
        public DeleteActivityCommandResponse() : base()
        {

        }

        public DeleteActivityDto Activity { get; set; }
    }
}
