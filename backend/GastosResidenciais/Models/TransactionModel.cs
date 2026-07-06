namespace GastosResidencias.Models;

public enum TransactionType
{
    Income,
    Expense,
}

public class TransactionModel
{
    public long Id { get; private set; }
    public string Description { get; set; } = string.Empty;
    public TransactionType TransactionType { get; set; }
    public Decimal Amount { get; set; } // init: Recebe pelo construtor

    public long PersonId { get; set; }
    public PersonModel Person { get; set; }
}
