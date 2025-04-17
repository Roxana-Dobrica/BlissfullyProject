using FluentValidation;

namespace Blissfully.Application.Features.Materials.Commands.DeleteMaterial
{
    public class DeleteMaterialCommandValidator : AbstractValidator<DeleteMaterialCommand>
    {
        public DeleteMaterialCommandValidator()
        {
            RuleFor(p => p.MaterialId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Must(id => Guid.TryParse(id.ToString(), out _)).WithMessage("{PropertyName} must be a valid guid.");
        }
    }
}
