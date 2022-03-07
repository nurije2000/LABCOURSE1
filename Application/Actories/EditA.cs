using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Actories
{
    public class EditA
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Actory Actory { get; set; }
        }
             public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Actory).SetValidator(new ActoryValidator());
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
                var actory = await _context.Actories.FindAsync(request.Actory.Id);

                if (actory == null) return null;

               _mapper.Map(request.Actory, actory);

              var result = await _context.SaveChangesAsync() > 0 ;

              if (!result) return Result<Unit>.Failure("Failed to update actory");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
    }