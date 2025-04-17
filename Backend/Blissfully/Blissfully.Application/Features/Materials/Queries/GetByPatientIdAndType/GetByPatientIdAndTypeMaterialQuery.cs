using Blissfully.Domain.Common;
using MediatR;

namespace Blissfully.Application.Features.Materials.Queries.GetByPatientIdAndType
{
    public class GetByPatientIdAndTypeMaterialQuery : IRequest<GetByPatientIdAndTypeMaterialQueryResponse>
    {
        public GetByPatientIdAndTypeMaterialQuery(Guid patientId, MaterialCategory type)
        {
            this.patientId = patientId;
            this.type = type;
        }

        public Guid patientId { get; set; }
        public MaterialCategory type { get; set; }
    }
}
