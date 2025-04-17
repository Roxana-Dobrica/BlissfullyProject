using MediatR;

namespace Blissfully.Application.Features.PatientTestAnswer.Queries.GetByPatientAndTestId
{
    public class GetAnswersByPatientAndTestIdQuery : IRequest<GetAnswersByPatientAndTestIdQueryResponse>
    {
        public GetAnswersByPatientAndTestIdQuery(Guid patientId, Guid testId)
        {
            PatientId = patientId;
            TestId = testId;
        }
        public Guid PatientId { get; set; }
        public Guid TestId { get; set; }
    }
}
