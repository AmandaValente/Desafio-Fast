using DesafioFast.Models;
using Microsoft.AspNetCore.Mvc;
using DesafioFast.Data;

namespace DesafioFast.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkshopsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkshopsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Workshop>> GetWorkshops()
        {
            return _context.Workshops.ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<Workshop> GetWorkshop(int id)
        {
            var workshop = _context.Workshops.Find(id);

            if (workshop == null)
            {
                return NotFound();
            }

            return workshop;
        }


        [HttpPost]
        public ActionResult<Workshop> PostWorkshop(Workshop workshop)
        {
            _context.Workshops.Add(workshop);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetWorkshop), new { id = workshop.Id }, workshop);
        }


        [HttpPut("{id}")]
        public IActionResult PutWorkshop(int id, Workshop workshop)
        {
            if (id != workshop.Id)
            {
                return BadRequest();
            }

            _context.Entry(workshop).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteWorkshop(int id)
        {
            var workshop = _context.Workshops.Find(id);
            if (workshop == null)
            {
                return NotFound();
            }

            _context.Workshops.Remove(workshop);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
