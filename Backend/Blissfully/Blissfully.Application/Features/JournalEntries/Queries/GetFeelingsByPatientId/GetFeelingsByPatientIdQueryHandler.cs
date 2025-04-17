using Blissfully.Application.Persistence;
using MediatR;

namespace Blissfully.Application.Features.JournalEntries.Queries.GetFeelingsByPatientId
{
    public class GetFeelingsByPatientIdQueryHandler : IRequestHandler<GetFeelingsByPatientIdQuery, GetFeelingsByPatientIdQueryResponse>
    {
        private readonly IJournalEntryRepository repository;
        public GetFeelingsByPatientIdQueryHandler(IJournalEntryRepository repository)
        {
            this.repository = repository;
            
        }

        public async Task<GetFeelingsByPatientIdQueryResponse> Handle(GetFeelingsByPatientIdQuery request, CancellationToken cancellationToken)
        {
            var result = await repository.FindByPatientIdAsync(request.PatientId);
            var feelingsCount = new Dictionary<string, int>
            {
                { "joy", 0 },
                { "sadness", 0 },
                { "love", 0 },
                { "fear", 0 },
                { "anger", 0 },
                { "surprise", 0 }
            };

            if (result.IsSuccess)
            {
                foreach (var entry in result.Value)
                {
                    if (feelingsCount.ContainsKey(entry.Feelings[0]))
                    {
                        feelingsCount[entry.Feelings[0]]++;
                    }
                }
            }

            return new GetFeelingsByPatientIdQueryResponse
            {
                FeelingsCount = feelingsCount
            };
        }
    }
}
