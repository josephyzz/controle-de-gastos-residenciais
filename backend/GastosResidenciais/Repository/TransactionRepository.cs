namespace GastosResidencias.Repository;

using GastosResidencias.Database;
using GastosResidencias.Dto;
using GastosResidencias.Models;
using Microsoft.EntityFrameworkCore;

public class TransactionRepository
{
    private readonly DataContext _context;

    // Injerção de Dependência.
    public TransactionRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<TransactionAllSummaryTotal> GetAllSummaryTotalAsync()
    {
        var totalPeople = await _context.People.CountAsync();
        var totalIncome = await _context
            .Transaction.Where(t => t.TransactionType == TransactionType.Income)
            .SumAsync(t => t.Amount);

        var totalExpense = await _context
            .Transaction.Where(t => t.TransactionType == TransactionType.Expense)
            .SumAsync(t => t.Amount);

        return new TransactionAllSummaryTotal(
            totalPeople,
            totalIncome,
            totalExpense,
            totalIncome - totalExpense
        );
    }

    public async Task<TransactionModel> CreateAsync(TransactionRequest request)
    {
        // 1. Instanciação de transaction
        var transaction = new TransactionModel
        {
            Description = request.description,
            TransactionType = request.transactionType,
            Amount = request.amount,
            PersonId = request.personId,
        };
        // 2. Adicionando ao contexto e salvando no banco de dados
        await _context.Transaction.AddAsync(transaction);
        // Realiza o commit no banco de dados.
        await _context.SaveChangesAsync();

        return transaction;
    }
}
