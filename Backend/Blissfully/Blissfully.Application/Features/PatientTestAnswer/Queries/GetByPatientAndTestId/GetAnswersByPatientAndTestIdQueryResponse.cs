namespace Blissfully.Application.Features.PatientTestAnswer.Queries.GetByPatientAndTestId
{
    public class GetAnswersByPatientAndTestIdQueryResponse
    {
        public List<PatientTestAnswerDto> PatientTestAnswers { get; set; } = default!;
    }
}
