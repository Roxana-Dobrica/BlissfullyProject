using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetFeelingsByPatientId
{
    public class GetFeelingsByPatientIdQuery : IRequest<GetFeelingsByPatientIdQueryResponse>
    {
        public GetFeelingsByPatientIdQuery(Guid patientId)
        {
            PatientId = patientId;
        }

        public Guid PatientId { get; set; }
    }
}
