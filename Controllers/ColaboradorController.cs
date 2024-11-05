using DesafioFast.Data;
using DesafioFast.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesafioFast.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ColaboradoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Colaborador>> GetColaboradores()
        {
            return _context.Colaboradores.ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<Colaborador> GetColaborador(int id)
        {
            var colaborador = _context.Colaboradores.Find(id);

            if (colaborador == null)
            {
                return NotFound();
            }

            return colaborador;
        }


        [HttpPost]
        public ActionResult<Colaborador> PostColaborador(Colaborador colaborador)
        {
            _context.Colaboradores.Add(colaborador);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetColaborador), new { id = colaborador.Id }, colaborador);
        }


        [HttpPut("{id}")]
        public IActionResult PutColaborador(int id, Colaborador colaborador)
        {
            if (id != colaborador.Id)
            {
                return BadRequest();
            }

            _context.Entry(colaborador).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteColaborador(int id)
        {
            var colaborador = _context.Colaboradores.Find(id);
            if (colaborador == null)
            {
                return NotFound();
            }

            _context.Colaboradores.Remove(colaborador);
            _context.SaveChanges();

            return NoContent();
        }
    }
}