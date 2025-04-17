using MediatR;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.DeletePatientTestAnswer
{
    public class DeletePatientTestAnswerCommand : IRequest<DeletePatientTestAnswerCommandResponse>
    {
        public Guid TestId { get; set; } = default!;
    }
}
