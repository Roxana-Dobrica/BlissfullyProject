using Blissfully.Application.Features.JournalEntries.Queries.GetById;
using Blissfully.Application.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blissfully.Application.Features.Tests.Queries.GetById
{
    public class GetByIdTestQueryHandler : IRequestHandler<GetByIdTestQuery, TestDto>
    {
        private readonly ITestRepository repository;

        public GetByIdTestQueryHandler(ITestRepository repository)
        {
            this.repository = repository;
        }

        public async Task<TestDto> Handle(GetByIdTestQuery request, CancellationToken cancellationToken)
        {
            var Test = await repository.FindByIdAsync(request.Id);
            if (Test.IsSuccess)
            {
                return new TestDto
                {
                    TestId = Test.Value.TestId,
                    TherapistId = Test.Value.TherapistId,
                    TestTitle = Test.Value.TestTitle,
                };
            }
            return new TestDto();
        }
    }
}
