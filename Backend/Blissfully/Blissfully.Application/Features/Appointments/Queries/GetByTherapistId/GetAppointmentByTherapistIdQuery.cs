using MediatR;

namespace Blissfully.Application.Features.Appointments.Queries.GetByTherapistId
{
    public class GetAppointmentByTherapistIdQuery : IRequest<GetAppointmentByTherapistIdQueryResponse>
    {
        public GetAppointmentByTherapistIdQuery(Guid therapistId)
        {
            TherapistId = therapistId;
        }

        public Guid TherapistId { get; set; }
    }
}
