using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.Appointments.Commands.CreateAppointment
{
    public class CreateAppointmentCommandHandler : IRequestHandler<CreateAppointmentCommand, CreateAppointmentCommandResponse>
    {
        private readonly IAppointmentRepository appointmentRepository;
        private readonly ILogger<CreateAppointmentCommandHandler> logger;

        public CreateAppointmentCommandHandler(IAppointmentRepository appointmentRepository, ILogger<CreateAppointmentCommandHandler> logger)
        {
            this.appointmentRepository = appointmentRepository;
            this.logger = logger;
        }

        public async Task<CreateAppointmentCommandResponse> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateAppointmentCommandValidator(appointmentRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreateAppointmentCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var appointment = Appointment.Create(request.PatientId, request.TherapistId, request.AppointmentDate, request.StartTime, request.EndTime);
            if (appointment.IsSuccess)
            {
                var result = appointmentRepository.AddAsync(appointment.Value);
                return new CreateAppointmentCommandResponse()
                {
                    Success = true,
                    Appointment = new CreateAppointmentDto()
                    {
                        AppointmentId = appointment.Value.AppointmentId,
                        PatientId = appointment.Value.PatientId,
                        TherapistId = appointment.Value.TherapistId,
                        AppointmentDate = appointment.Value.AppointmentDate,
                        StartTime = appointment.Value.StartTime,
                        EndTime = appointment.Value.EndTime        
                    }
                };
            }
            return new CreateAppointmentCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { appointment.Error }
            };
        }
    }
}

