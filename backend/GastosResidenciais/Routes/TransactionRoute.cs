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

        // GET Transactions BY PERSON ID
        route.MapGet(
            "",
            async (long personId, DataContext context) =>
            {
                // 1. Busca e filtra as transaction com base no ID da person
                var transactions = await context
                    .Transaction.Where(t => t.PersonId == personId)
                    .ToListAsync();

                // 2. Transformando Entidade em DTO.
                var response = new List<TransactionResponse>();

                foreach (var transaction in transactions)
                {
                    response.Add(
                        new TransactionResponse(
                            transaction.Id,
                            transaction.Description,
                            transaction.TransactionType,
                            transaction.Amount,
                            transaction.PersonId
                        )
                    );
                }

                return Results.Ok(response);
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
                    return Results.BadRequest(
                        new { message = "Menores de idade não podem cadastrar receitas." }
                    );

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

                var response = new TransactionResponse(
                    transaction.Id,
                    transaction.Description,
                    transaction.TransactionType,
                    transaction.Amount,
                    transaction.PersonId
                );
                // 4. Retorna o status 201 (Created) com o objeto criado
                return Results.Created($"/transaction/{transaction.Id}", response);
            }
        );
    }
}
