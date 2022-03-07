using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Actories
{
    public class DeleteA
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var actory = await _context.Actories.FindAsync(request.Id);

               // if (actory == null) return null;
                _context.Remove(actory);

               var result =  await _context.SaveChangesAsync() > 0;

               if (!result) return Result<Unit>.Failure("Failed to delete the actory");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}