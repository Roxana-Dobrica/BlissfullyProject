namespace Blissfully.Application.Features.JournalEntries.Queries.GetFeelingsByPatientId
{
    public class GetFeelingsByPatientIdQueryResponse
    {
        public Dictionary<string, int> FeelingsCount { get; set; } = new();
    }
}
