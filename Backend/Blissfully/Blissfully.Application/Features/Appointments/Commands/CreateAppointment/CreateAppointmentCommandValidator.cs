using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.Appointments.Commands.CreateAppointment
{
    public class CreateAppointmentCommandValidator : AbstractValidator<CreateAppointmentCommand>
    {
        private readonly IAppointmentRepository repository;

        public CreateAppointmentCommandValidator(IAppointmentRepository repository)
        {
            this.repository = repository;

            RuleFor(e => e.AppointmentDate)
                .NotEmpty()
                .WithMessage("Appointment date must not be empty")
                .GreaterThanOrEqualTo(DateTime.Now.Date)
                .WithMessage("{PropertyName} must be greater than or equal to current date");

            RuleFor(e => e.StartTime)
                .NotEmpty()
                .WithMessage("Start time must not be empty");

            RuleFor(e => e.EndTime)
                .NotEmpty()
                .WithMessage("End time must not be empty");

            RuleFor(e => e)
                .Must(HaveValidTimeRange)
                .WithMessage("End time must be after start time");
        }

        private bool BeInTheFuture(TimeSpan time)
        {
            return DateTime.Today.Add(time) > DateTime.Now;
        }

        private bool HaveValidTimeRange(CreateAppointmentCommand command)
        {
            return command.EndTime > command.StartTime;
        }
    }
}
