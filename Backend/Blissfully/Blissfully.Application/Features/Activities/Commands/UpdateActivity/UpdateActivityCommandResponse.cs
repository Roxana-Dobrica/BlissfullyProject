using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Activities.Commands.UpdateActivity
{
    public class UpdateActivityCommandResponse : BaseResponse
    {
        public UpdateActivityCommandResponse() : base()
        {
        }

        public UpdateActivityDto Activity { get; set; } = default!;
    }
}
