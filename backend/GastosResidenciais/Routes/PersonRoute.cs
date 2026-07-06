//Controller para de rotas Person
namespace GastosResidencias.Routes;

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;

public static class PersonRoute
{
    //This sinaliza que é um metodo de extensão app
    public static void PersonRoutes(this WebApplication app)
    {
        var route = app.MapGroup("person");
        route.MapPost(
            "",
            async (PersonRequest req, DataContext context) =>
            {
                var person = new PersonModel(req.name, req.age);
                await context.AddAsync(person);
                // Representa o commit no banco de dados.
                await context.SaveChangesAsync();
            }
        );
    }
}
