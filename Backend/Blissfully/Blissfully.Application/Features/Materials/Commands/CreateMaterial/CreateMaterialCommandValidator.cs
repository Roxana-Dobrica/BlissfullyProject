using Blissfully.Application.Persistence;
using FluentValidation;

namespace Blissfully.Application.Features.Materials.Commands.CreateMaterial
{
    public class CreateMaterialCommandValidator : AbstractValidator<CreateMaterialCommand>
    {
        private readonly IMaterialRepository repository;

        public CreateMaterialCommandValidator(IMaterialRepository repository)
        {
            RuleFor(e => e.MaterialTitle)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters");

            RuleFor(e => e.MaterialUrl)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull().WithMessage("{PropertyName} is required")
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters");

            this.repository = repository;
        }
    }
}
