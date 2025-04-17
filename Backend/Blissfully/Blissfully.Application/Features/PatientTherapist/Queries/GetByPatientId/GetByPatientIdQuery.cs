using MediatR;

namespace Blissfully.Application.Features.PatientTherapist.Queries.GetByPatientId
{
    public record GetByPatientIdQuery(Guid Id) : IRequest<PatientTherapistDto>;
}
