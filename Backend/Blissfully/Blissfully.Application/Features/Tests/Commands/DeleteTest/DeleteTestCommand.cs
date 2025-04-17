using MediatR;

namespace Blissfully.Application.Features.Tests.Commands.DeleteTest
{
    public class DeleteTestCommand : IRequest<DeleteTestCommandResponse>
    {
        public Guid TestId { get; set; }
    }
}
