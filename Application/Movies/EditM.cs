using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Movies
{
    public class EditM
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var movie = await _context.Movies.FindAsync(request.Movie.Id);

                if (movie == null) return null;

               _mapper.Map(request.Movie, movie);

              var result = await _context.SaveChangesAsync() > 0 ;

              if (!result) return Result<Unit>.Failure("Failed to update movie");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
    }