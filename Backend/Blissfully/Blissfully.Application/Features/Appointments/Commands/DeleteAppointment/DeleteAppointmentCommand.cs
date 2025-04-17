using MediatR;

namespace Blissfully.Application.Features.Appointments.Commands.DeleteAppointment
{
    public class DeleteAppointmentCommand : IRequest<DeleteAppointmentCommandResponse>
    {
        public Guid AppointmentId { get; set; } = default!;
    }
}
