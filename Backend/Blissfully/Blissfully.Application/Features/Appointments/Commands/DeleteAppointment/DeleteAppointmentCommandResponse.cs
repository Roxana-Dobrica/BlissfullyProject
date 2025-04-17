using Blissfully.Application.Responses;

namespace Blissfully.Application.Features.Appointments.Commands.DeleteAppointment
{
    public class DeleteAppointmentCommandResponse : BaseResponse
    {
        public DeleteAppointmentCommandResponse() : base()
        {

        }

        public DeleteAppointmentDto Appointment { get; set; }
    }
}
