// Controller para rotas Person
namespace GastosResidencias.Routes;

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

public static class PersonRoute
{
    // This sinaliza que é um metodo de extensão app
    public static void PersonRoutes(this WebApplication app)
    {
        var route = app.MapGroup("person");

        // GET
        route.MapGet(
            "/summary",
            async (DataContext context) =>
            {
                var people = await context
                    .People.Select(person => new PersonSummaryResponse(
                        person.Id,
                        person.Name,
                        person.Age,
                        person
                            .Transactions.Where(t => t.TransactionType == TransactionType.Income)
                            .Sum(t => t.Amount),
                        person
                            .Transactions.Where(t => t.TransactionType == TransactionType.Expense)
                            .Sum(t => t.Amount),
                        person
                            .Transactions.Where(t => t.TransactionType == TransactionType.Income)
                            .Sum(t => t.Amount)
                            - person
                                .Transactions.Where(t =>
                                    t.TransactionType == TransactionType.Expense
                                )
                                .Sum(t => t.Amount)
                    ))
                    .ToListAsync();

                return Results.Ok(people);
            }
        );

        // POST
        route.MapPost(
            "",
            async (PersonRequest req, DataContext context) =>
            {
                var person = new PersonModel { Name = req.name, Age = req.age };
                await context.AddAsync(person);
                // Representa o commit no banco de dados.
                await context.SaveChangesAsync();
            }
        );
        // DELETE
        route.MapDelete(
            "{id:long}",
            async (long id, DataContext context) =>
            {
                var person = await context.People.FirstOrDefaultAsync(x => x.Id == id);

                if (person == null)
                    return Results.NotFound();

                context.People.Remove(person);
                await context.SaveChangesAsync();

                return Results.NoContent();
            }
        );
    }
}
