using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Actories
{
    public class ListA
    {
        public class Query : IRequest<Result<List<Actory>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Actory>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task <Result<List<Actory>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Actory>>.Success(await _context.Actories.ToListAsync(cancellationToken));
            }
        }
    }
}