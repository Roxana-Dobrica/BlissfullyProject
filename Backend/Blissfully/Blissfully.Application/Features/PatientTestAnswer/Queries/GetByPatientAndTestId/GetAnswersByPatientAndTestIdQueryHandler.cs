using Blissfully.Application.Contracts;
using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTestAnswer.Queries.GetByPatientAndTestId
{
    public class GetAnswersByPatientAndTestIdQueryHandler : IRequestHandler<GetAnswersByPatientAndTestIdQuery, GetAnswersByPatientAndTestIdQueryResponse>
    {
        private readonly IPatientTestAnswerRepository repository;
        private readonly IEncryptionService encryptionService;

        public GetAnswersByPatientAndTestIdQueryHandler(IPatientTestAnswerRepository repository, IEncryptionService encryptionService)
        {
            this.repository = repository;
            this.encryptionService = encryptionService;
        }

        public async Task<GetAnswersByPatientAndTestIdQueryResponse> Handle(GetAnswersByPatientAndTestIdQuery request, CancellationToken cancellationToken)
        {
            GetAnswersByPatientAndTestIdQueryResponse response = new();
            var result = await repository.FindByPatientAndTestIdAsync(request.PatientId, request.TestId);
            if (result.IsSuccess)
            {
                response.PatientTestAnswers = result.Value.Select(a => new PatientTestAnswerDto
                {
                    PatientTestAnswerId = a.PatientTestAnswerId,
                    TestId = a.TestId,
                    TestQuestionId = a.TestQuestionId,
                    PatientId = a.PatientId,
                    Answer = a.Answer.Select(answer => encryptionService.Decrypt(answer)).ToList()
                }).ToList();
            }
            return response;
        }
    }
}
