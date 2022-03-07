using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Actories
{
    public class DetailsA
    {
        public class Query : IRequest<Result<Actory>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Actory>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Actory>> Handle(Query request, CancellationToken cancellationToken)
            {
                var actory = await _context.Actories.FindAsync(request.Id);

            return Result<Actory>.Success(actory);
            }
        }
    }
}