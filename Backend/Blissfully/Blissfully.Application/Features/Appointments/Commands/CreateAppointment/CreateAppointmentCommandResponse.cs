using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Appointments.Commands.CreateAppointment
{
    public class CreateAppointmentCommandResponse : BaseResponse
    {
        public CreateAppointmentCommandResponse() : base()
        {
        }
        public CreateAppointmentDto Appointment { get; set; } = default!;
    }
}
