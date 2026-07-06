//Controller para rotas Transaction

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

public static class TransactionRoute
{
    public static void TransactionRoutes(this WebApplication app)
    {
        var route = app.MapGroup("Transaction");

        // GET
        route.MapGet(
            "",
            async (DataContext context) =>
            {
                // 1. Busca as transaction
                var transactions = await context.Transaction.ToListAsync();
                return Results.Ok(transactions);
            }
        );

        // POST
        route.MapPost(
            "",
            async (TransactionRequest req, DataContext context) =>
            {
                // 1. Validação de pessoa no banco de dados e restrição por idade
                var person = await context.People.FirstOrDefaultAsync(x => x.Id == req.personId);

                if (person == null)
                    return Results.NotFound(new { message = "Pessoa não encontrada." });
                // Regra de negócio, menor de idade apenas despesas
                if (person.Age < 18 && req.transactionType == TransactionType.Income)
                    return Results.Forbid();

                // 2. Instanciação de transaction
                var transaction = new TransactionModel
                {
                    Description = req.description,
                    TransactionType = req.transactionType,
                    Amount = req.amount,
                    PersonId = person.Id,
                };

                // 3. Adicionando ao contexto e salvando no banco de dados
                await context.Transaction.AddAsync(transaction);
                await context.SaveChangesAsync();

                // 4. Retorna o status 201 (Created) com o objeto criado
                return Results.Created($"/transaction/{transaction.Id}", transaction);
            }
        );
    }
}
