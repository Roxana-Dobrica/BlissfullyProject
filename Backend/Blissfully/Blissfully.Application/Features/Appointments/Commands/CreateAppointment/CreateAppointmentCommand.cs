using MediatR;

namespace Blissfully.Application.Features.Appointments.Commands.CreateAppointment
{
    public class CreateAppointmentCommand : IAppointmentCommand, IRequest<CreateAppointmentCommandResponse>
    {
    }
}
