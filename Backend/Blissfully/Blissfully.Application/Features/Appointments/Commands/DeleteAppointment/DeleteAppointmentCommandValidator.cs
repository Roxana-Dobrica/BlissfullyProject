using FluentValidation;

namespace Blissfully.Application.Features.Appointments.Commands.DeleteAppointment
{
    public class DeleteAppointmentCommandValidator : AbstractValidator<DeleteAppointmentCommand>
    {
        public DeleteAppointmentCommandValidator()
        {
            RuleFor(p => p.AppointmentId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
