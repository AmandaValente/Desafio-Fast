using Microsoft.EntityFrameworkCore;
using DesafioFast.Models;

namespace DesafioFast.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Colaborador> Colaboradores { get; set; }
        public DbSet<Workshop> Workshops { get; set; }
    }
}
