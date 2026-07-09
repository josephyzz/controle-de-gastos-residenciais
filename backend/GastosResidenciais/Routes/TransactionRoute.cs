//Controller para rotas Transaction

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;
using GastosResidencias.Repository;
using Microsoft.EntityFrameworkCore;

public static class TransactionRoute
{
    public static void TransactionRoutes(this WebApplication app)
    {
        var route = app.MapGroup("person");

        // GET Transactions BY PERSON ID
        route.MapGet(
            "/{personId}/transactions",
            async (long personId, DataContext context) =>
            {
                // 1. Busca e filtra as transaction com base no ID da person
                var person = await context
                    .People.Include(p => p.Transactions)
                    .FirstOrDefaultAsync(p => p.Id == personId);

                // Caso não exista nenhuma transaction com o ID do person
                if (person is null)
                {
                    return Results.NotFound();
                }

                // 2. Transformando Entidade em DTO.
                var response = new PersonTransactionResponse(
                    person.Id,
                    person.Name,
                    person.Age,
                    person
                        .Transactions.Select(t => new TransactionResponse(
                            t.Id,
                            t.Description,
                            t.Amount,
                            t.TransactionType
                        ))
                        .ToList()
                );
                return Results.Ok(response);
            }
        );

        // POST
        route.MapPost(
            "/transaction",
            async (
                TransactionRequest req,
                PersonRepository repositoryPerson,
                TransactionRepository repository
            ) =>
            {
                // 1. Validação de pessoa no banco de dados e restrição por idade
                var person = await repositoryPerson.GetFirstAsync((int)req.personId); // (int) é uma forma de tipagem/transformação

                // Verificando se person existe
                if (person == null)
                    return Results.NotFound(new { message = "Pessoa não encontrada." });

                // Verificando se amount não é negativo ou zero
                if (req.amount <= 0)
                {
                    return Results.BadRequest(new { message = "O valor deve ser maior que zero." });
                }
                // Regra de negócio, menor de idade apenas despesas
                if (person.Age < 18 && req.transactionType == TransactionType.Income)
                    return Results.BadRequest(
                        new { message = "Menores de idade não podem cadastrar receitas." }
                    );
                // 2. Criando transaction pelo repository.
                var transaction = repository.CreateAsync(req);

                // 3. Retorna o status 201 (Created) com o objeto criado
                return Results.Created();
            }
        );
    }
}
