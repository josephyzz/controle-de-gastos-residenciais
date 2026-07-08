namespace GastosResidencias.Repository;

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

// Classe que tem como responsabilidade, conversar com Banco de dados.
public class PersonRepository
{
    private readonly DataContext _context;

    // Injerção de dependências na classe.
    public PersonRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<PersonModel?> GetFirstAsync(int personId)
    {
        return await _context.People.FirstOrDefaultAsync(x => x.Id == personId);
    }

    // Método que busca o summary de pessoa.
    public async Task<List<PersonSummaryResponse>> GetSummaryAsync()
    {
        return await _context
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
                        .Transactions.Where(t => t.TransactionType == TransactionType.Expense)
                        .Sum(t => t.Amount)
            ))
            .ToListAsync();
    }

    // Método para criar Person.
    public async Task<PersonModel> CreateAsync(PersonRequest request)
    {
        var person = new PersonModel { Name = request.name, Age = request.age };
        await _context.People.AddAsync(person);
        // Realiza o commit no banco de dados.
        await _context.SaveChangesAsync();

        return person;
    }
}
