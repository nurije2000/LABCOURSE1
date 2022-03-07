using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using MediatR;
using Persistence;
using Movie = Domain.Movie;

namespace Application.Movies
{
    public class CreateM
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Movie Movie { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Movie).SetValidator(new MovieValidator());
            }
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
                _context.Movies.Add(request.Movie);

               var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure ("Failed to create movie!");

                return Result<Unit>.Success(Unit.Value);
            }

            private string GetDebuggerDisplay()
            {
                return ToString();
            }
        }

        // public class Command : IRequest<object>
        // {
        //     public Movie Movie { get; set; }
        // }
    }
}