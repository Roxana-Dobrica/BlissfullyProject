using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Queries.GetByPatientId
{
    public class GetByPatientIdTestsQuery : IRequest<GetByPatientIdTestsQueryResponse>
    {
        public GetByPatientIdTestsQuery(Guid patientId)
        {
            PatientId = patientId;
        }
        public Guid PatientId { get; set; }
    }
}
