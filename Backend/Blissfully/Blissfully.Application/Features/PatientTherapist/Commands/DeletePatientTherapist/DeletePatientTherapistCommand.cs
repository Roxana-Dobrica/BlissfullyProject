using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Commands.DeletePatientTherapist
{
    public class DeletePatientTherapistCommand : IRequest<DeletePatientTherapistCommandResponse>
    {
        public Guid PatientId { get; set; } = default!;
        public Guid TherapistId { get; set; } = default!;
    }
}
