namespace GastosResidencias.Database;

using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DbSet<PersonModel> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=database.db");
        base.OnConfiguring(optionsBuilder);
    }
}
