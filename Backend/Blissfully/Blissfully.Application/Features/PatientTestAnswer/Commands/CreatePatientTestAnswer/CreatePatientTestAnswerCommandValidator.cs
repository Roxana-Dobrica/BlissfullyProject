using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.CreatePatientTestAnswer
{
    public class CreatePatientTestAnswerCommandValidator : AbstractValidator<CreatePatientTestAnswerCommand>
    {
        private readonly IPatientTestAnswerRepository repository;

        public CreatePatientTestAnswerCommandValidator(IPatientTestAnswerRepository repository)
        {
            RuleFor(e => e.TestId)
                .NotEmpty().WithMessage("PatientId is required.")
                .NotNull().WithMessage("PatientId is required.");
            RuleFor(e => e.TestQuestionId)
                .NotEmpty().WithMessage("PatientId is required.")
                .NotNull().WithMessage("PatientId is required.");
            RuleFor(e => e.PatientId)
                .NotEmpty().WithMessage("PatientId is required.")
                .NotNull().WithMessage("PatientId is required.");
            RuleFor(e => e.Answer)
                .NotEmpty().WithMessage("Answer is required.")
                .NotNull().WithMessage("Answer is required.");
        }
    }
}
