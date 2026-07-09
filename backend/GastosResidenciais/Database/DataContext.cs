namespace GastosResidencias.Database;

using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

// Context do banco de dados.
// Realiza a conexão com o conection direct
// Além de permitir realizar configurações
public class DataContext : DbContext
{
    public DbSet<PersonModel> People { get; set; }
    public DbSet<TransactionModel> Transaction { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //Connection direct é a string como texto
        optionsBuilder.UseSqlite("Data Source=database.db");
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configura explicitamente a relação 1:N
        modelBuilder
            .Entity<TransactionModel>()
            .HasOne(t => t.Person) // Transação tem 1 Pessoa
            .WithMany(p => p.Transactions) // Pessoa tem muitas Transações
            .HasForeignKey(t => t.PersonId) // Chave estrangeira na tabela de Transações
            .OnDelete(DeleteBehavior.Cascade); // Se deletar a pessoa, deleta os gastos dela

        base.OnModelCreating(modelBuilder);
    }
}
