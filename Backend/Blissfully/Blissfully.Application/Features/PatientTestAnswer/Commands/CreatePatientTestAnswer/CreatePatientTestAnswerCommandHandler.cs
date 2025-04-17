using Blissfully.Application.Contracts;
using Blissfully.Application.Features.PatientTestAssignments.Commands.CreatePatientTestAssignment;
using Blissfully.Application.Persistence;
using Blissfully.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Blissfully.Application.Features.PatientTestAnswer.Commands.CreatePatientTestAnswer
{
    public class CreatePatientTestAnswerCommandHandler : IRequestHandler<CreatePatientTestAnswerCommand, CreatePatientTestAnswerCommandResponse>
    {
        private readonly IPatientTestAnswerRepository patientTestAnswerRepository;
        private readonly ILogger<CreatePatientTestAnswerCommandHandler> logger;
        private readonly IEncryptionService encryptionService;

        public CreatePatientTestAnswerCommandHandler(IPatientTestAnswerRepository patientTestAnswerRepository, ILogger<CreatePatientTestAnswerCommandHandler> logger, IEncryptionService encryptionService)
        {
            this.patientTestAnswerRepository = patientTestAnswerRepository;
            this.logger = logger;
            this.encryptionService = encryptionService;
        }

        public async Task<CreatePatientTestAnswerCommandResponse> Handle(CreatePatientTestAnswerCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreatePatientTestAnswerCommandValidator(patientTestAnswerRepository);
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validatorResult.IsValid)
            {
                return new CreatePatientTestAnswerCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var encryptedAnswers = request.Answer.Select(answer => encryptionService.Encrypt(answer)).ToList();

            var patientTestAnswer = Domain.Entities.PatientTestAnswer.Create(request.TestId, request.TestQuestionId, request.PatientId, encryptedAnswers);
            if (patientTestAnswer.IsSuccess)
            {
                var result = patientTestAnswerRepository.AddAsync(patientTestAnswer.Value);
                return new CreatePatientTestAnswerCommandResponse()
                {
                    Success = true,
                    PatientTestAnswer = new CreatePatientTestAnswerDto()
                    {
                        PatientTestAnswerId = patientTestAnswer.Value.PatientTestAnswerId,
                        TestId = patientTestAnswer.Value.TestId,
                        TestQuestionId = patientTestAnswer.Value.TestQuestionId,
                        PatientId = patientTestAnswer.Value.PatientId,
                        Answer = patientTestAnswer.Value.Answer    
                    }
                };
            }
            return new CreatePatientTestAnswerCommandResponse
            {
                Success = false,
                ValidationsErrors = new List<string>() { patientTestAnswer.Error }
            };
        }
    }
}
