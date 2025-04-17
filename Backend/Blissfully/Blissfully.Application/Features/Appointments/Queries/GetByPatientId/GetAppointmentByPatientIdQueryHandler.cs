using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Appointments.Queries.GetByPatientId
{
    public class GetAppointmentByPatientIdQueryHandler : IRequestHandler<GetAppointmentByPatientIdQuery, GetAppointmentByPatientIdQueryResponse>
    {
        private readonly IAppointmentRepository appointmentRepository;
        public GetAppointmentByPatientIdQueryHandler(IAppointmentRepository appointmentRepository)
        {
            this.appointmentRepository = appointmentRepository;
        }
        public async Task<GetAppointmentByPatientIdQueryResponse> Handle(GetAppointmentByPatientIdQuery request, CancellationToken cancellationToken)
        {
            GetAppointmentByPatientIdQueryResponse response = new();
            var result = await appointmentRepository.FindByPatientIdAsync(request.PatientId);
            if (result.IsSuccess)
            {
                response.Appointments = result.Value.Select(a => new AppointmentDto
                {
                    AppointmentId = a.AppointmentId,
                    PatientId = a.PatientId,
                    TherapistId = a.TherapistId,
                    AppointmentDate = a.AppointmentDate,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime
                }).ToList();
            }
            return response;
        }
    }
}
