//Controller para rotas Person
namespace GastosResidencias.Routes;

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

public static class PersonRoute
{
    //This sinaliza que é um metodo de extensão app
    public static void PersonRoutes(this WebApplication app)
    {
        var route = app.MapGroup("person");

        // GET
        route.MapGet(
            "",
            async (DataContext context) =>
            {
                var peoples = await context.People.ToListAsync();
                return Results.Ok(peoples);
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
