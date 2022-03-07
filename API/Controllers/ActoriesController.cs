using System;
using System.Threading.Tasks;
using Application.Actories;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActoriesController : BaseApiController
    {
       
        [HttpGet]
        public async Task<IActionResult> GetActories()
        {
            return HandleResult(await Mediator.Send(new ListA.Query()));
        }

        [HttpGet("{id}")]//actories /id
        public async Task<IActionResult> GetActories(Guid id)
        {

            return HandleResult(await Mediator.Send(new DetailsA.Query{Id = id}));
        }
         
         [HttpPost]
         public async Task<IActionResult> CreateActory(Actory actory)
         {
             return HandleResult(await Mediator.Send(new CreateA.Command {Actory = actory}));
         }

         [HttpPut("{id}")]

         public async Task<IActionResult> EditActory(Guid id, Actory actory)
         {

             actory.Id = id;
             return HandleResult(await Mediator.Send(new EditA.Command{Actory = actory}));
         }
         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteActory(Guid id)
         {
             return HandleResult(await Mediator.Send(new DeleteA.Command{Id = id}));
         }
              
    }
}