// Controller para rotas Person
namespace GastosResidencias.Routes;

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Repository;
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
            // Injerção de Dependências
            async (PersonRepository repository, TransactionRepository repo) =>
            {
                // 1. Buscando os dados no banco de dados.
                var summary = await repository.GetSummaryAsync();
                var total = await repo.GetAllSummaryTotalAsync();
                // 2. Montando JSON
                var response = new { data = summary, summaryTotal = total };

                return Results.Ok(response);
            }
        );

        // POST
        route.MapPost(
            "",
            async (PersonRequest req, PersonRepository repository) =>
            {
                // 1. Validando os dados
                if (req.age <= 0)
                {
                    return Results.BadRequest(
                        new { message = "Idade não pode ser menor ou igual a zero." }
                    );
                }
                // 2. Criando registro de pessoa
                var person = await repository.CreateAsync(req);
                //3. Retornando dados
                return Results.Created("", person);
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
