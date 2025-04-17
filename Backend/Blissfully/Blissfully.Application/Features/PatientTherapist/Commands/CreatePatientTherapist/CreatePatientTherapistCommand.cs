using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Commands.CreatePatientTherapist
{
    public class CreatePatientTherapistCommand : IPatientTherapistCommand, IRequest<CreatePatientTherapistCommandResponse>
    {
    }
}
