using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.Appointments.Commands.DeleteAppointment
{
    public class DeleteAppointmentCommandHandler : IRequestHandler<DeleteAppointmentCommand, DeleteAppointmentCommandResponse>
    {
        private readonly IAppointmentRepository repository;
        public DeleteAppointmentCommandHandler(IAppointmentRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeleteAppointmentCommandResponse> Handle(DeleteAppointmentCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteAppointmentCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeleteAppointmentCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    Appointment = new DeleteAppointmentDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var Appointment = await repository.FindByIdAsync(request.AppointmentId);
            if (Appointment.IsSuccess)
            {
                await repository.DeleteAsync(request.AppointmentId);
                return new DeleteAppointmentCommandResponse
                {
                    Success = true,
                    Appointment = new DeleteAppointmentDto
                    {
                        response = "Appointment Deleted Successfully"
                    }
                };
            }
            return new DeleteAppointmentCommandResponse
            {
                Success = false,
                Appointment = new DeleteAppointmentDto
                {
                    response = "Appointment Not Found"
                }
            };
        }
    }
}
