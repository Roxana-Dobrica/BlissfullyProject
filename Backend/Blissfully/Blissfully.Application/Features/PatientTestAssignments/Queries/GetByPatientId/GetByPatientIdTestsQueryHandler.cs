using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.PatientTestAssignments.Queries.GetByPatientId
{
    public class GetByPatientIdTestsQueryHandler : IRequestHandler<GetByPatientIdTestsQuery, GetByPatientIdTestsQueryResponse>
    {
        private readonly IPatientTestAssignmentRepository repository;

        public GetByPatientIdTestsQueryHandler(IPatientTestAssignmentRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetByPatientIdTestsQueryResponse> Handle(GetByPatientIdTestsQuery request, CancellationToken cancellationToken)
        {
            GetByPatientIdTestsQueryResponse response = new();
            var result = await repository.FindByPatientIdAsync(request.PatientId);
            if (result.IsSuccess)
            {
                response.PatientTestAssignments = result.Value.Select(a => new PatientTestAssignmentDto
                {
                   PatientTestAssignmentId = a.PatientTestAssignmentId,
                   PatientId = a.PatientId,
                   TestId = a.TestId,
                   IsCompleted = a.IsCompleted
                }).ToList();
            }
            return response;
        }
    }
}
