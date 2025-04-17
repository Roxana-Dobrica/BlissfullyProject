using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.DeletePatientTestAnswer
{
    public class DeletePatientTestAnswerCommandHandler : IRequestHandler<DeletePatientTestAnswerCommand, DeletePatientTestAnswerCommandResponse>
    {
        private readonly IPatientTestAnswerRepository repository;
        public DeletePatientTestAnswerCommandHandler(IPatientTestAnswerRepository repository)
        {
            this.repository = repository;
        }

        public async Task<DeletePatientTestAnswerCommandResponse> Handle(DeletePatientTestAnswerCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeletePatientTestAnswerCommandValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                return new DeletePatientTestAnswerCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList(),
                    PatientTestAnswer = new DeletePatientTestAnswerDto
                    {
                        response = "Invalid Data"
                    }
                };
            }

            var PatientTestAnswer = await repository.FindByTestIdAsync(request.TestId);
            if (PatientTestAnswer.IsSuccess)
            {
                await repository.DeleteByTestIdAsync(request.TestId);
                return new DeletePatientTestAnswerCommandResponse
                {
                    Success = true,
                    PatientTestAnswer = new DeletePatientTestAnswerDto
                    {
                        response = "Patient Answer deleted successfully"
                    }
                };
            }
            return new DeletePatientTestAnswerCommandResponse
            {
                Success = false,
                PatientTestAnswer = new DeletePatientTestAnswerDto
                {
                    response = "Patient test answer not found"
                }
            };
        }
    }
}
