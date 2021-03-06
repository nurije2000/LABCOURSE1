using Domain;
using FluentValidation;

namespace Application.Movies
{
    public class MovieValidator : AbstractValidator<Movie>
    {
        public MovieValidator(){

RuleFor(x => x.Title).NotEmpty();
RuleFor(x => x.Description).NotEmpty();
RuleFor(x => x.Date).NotEmpty();
RuleFor(x => x.Category).NotEmpty();
RuleFor(x => x.City).NotEmpty();
RuleFor(x => x.Venue).NotEmpty();
        }
    }
}