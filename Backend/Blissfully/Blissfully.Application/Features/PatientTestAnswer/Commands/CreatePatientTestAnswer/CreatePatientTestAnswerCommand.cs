using MediatR;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.CreatePatientTestAnswer
{
    public class CreatePatientTestAnswerCommand : IPatientTestAnswerCommand, IRequest<CreatePatientTestAnswerCommandResponse>
    {
    }
}
