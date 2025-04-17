using MediatR;

namespace Blissfully.Application.Features.TestTexts.Commands.DeleteTestTextByTestId
{
    public class DeleteTestTextCommand : IRequest<DeleteTestTextCommandResponse>
    {
        public Guid TestId { get; set; } = default!;
    }
}
