using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Appointments.Queries.GetByTherapistId
{
    public class GetAppointmentByTherapistIdQueryHandler : IRequestHandler<GetAppointmentByTherapistIdQuery, GetAppointmentByTherapistIdQueryResponse>
    {
        private readonly IAppointmentRepository appointmentRepository;
        public GetAppointmentByTherapistIdQueryHandler(IAppointmentRepository appointmentRepository)
        {
            this.appointmentRepository = appointmentRepository;
        }
        public async Task<GetAppointmentByTherapistIdQueryResponse> Handle(GetAppointmentByTherapistIdQuery request, CancellationToken cancellationToken)
        {
            GetAppointmentByTherapistIdQueryResponse response = new();
            var result = await appointmentRepository.FindByTherapistIdAsync(request.TherapistId);
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
