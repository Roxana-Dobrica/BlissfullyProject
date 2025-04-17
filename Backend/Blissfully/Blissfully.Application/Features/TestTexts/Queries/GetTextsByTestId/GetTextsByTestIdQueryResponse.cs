using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blissfully.Application.Features.TestTexts.Queries.GetTextsByTestId
{
    public class GetTextsByTestIdQueryResponse
    {
        public List<TestTextDto> Texts { get; set; } = default!;
    }
}
