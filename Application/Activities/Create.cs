using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Activity = Domain.Activity;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly Datacontext _context;

            public Handler(Datacontext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

               var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure ("Failed to create activity!");

                return Result<Unit>.Success(Unit.Value);
            }

            private string GetDebuggerDisplay()
            {
                return ToString();
            }
        }

        // public class Command : IRequest<object>
        // {
        //     public Activity Activity { get; set; }
        // }
    }
}