using MediatR;

namespace Blissfully.Application.Features.Appointments.Queries.GetByPatientId
{
    public class GetAppointmentByPatientIdQuery : IRequest<GetAppointmentByPatientIdQueryResponse>
    {
        public GetAppointmentByPatientIdQuery(Guid patientId)
        {
            PatientId = patientId;
        }

        public Guid PatientId { get; set; }
    }
}
