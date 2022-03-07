using System;
using System.Threading.Tasks;
using Application.Movies;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class MoviesController : BaseApiController
    {
       
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            return HandleResult(await Mediator.Send(new ListM.Query()));
        }

        [HttpGet("{id}")]//movies /id
        public async Task<IActionResult> GetMovies(Guid id)
        {

            return HandleResult(await Mediator.Send(new DetailsM.Query{Id = id}));
        }
         
         [HttpPost]
         public async Task<IActionResult> CreateMovie(Movie movie)
         {
             return HandleResult(await Mediator.Send(new CreateM.Command {Movie = movie}));
         }

         [HttpPut("{id}")]

         public async Task<IActionResult> EditMovie(Guid id, Movie movie)
         {

             movie.Id = id;
             return HandleResult(await Mediator.Send(new EditM.Command{Movie = movie}));
         }
         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteMovie(Guid id)
         {
             return HandleResult(await Mediator.Send(new DeleteM.Command{Id = id}));
         }
              
    }
}