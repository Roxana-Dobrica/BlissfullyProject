using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Activities.Commands.CreateActivity
{
    public class CreateActivityCommandResponse : BaseResponse
    {
        public CreateActivityCommandResponse() : base() 
        { 
        }
        public CreateActivityDto Activity { get; set; } = default!;
    }
}
