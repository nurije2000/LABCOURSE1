using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Actory = Domain.Actory;

namespace Application.Actories
{
    public class CreateA
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

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Actories.Add(request.Actory);

               var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure ("Failed to create actory!");

                return Result<Unit>.Success(Unit.Value);
            }

            private string GetDebuggerDisplay()
            {
                return ToString();
            }
        }

        // public class Command : IRequest<object>
        // {
        //     public Actory Actory { get; set; }
        // }
    }
}