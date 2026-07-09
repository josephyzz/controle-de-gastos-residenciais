namespace GastosResidencias.Models;

// Enum representado por Indice
public enum TransactionType
{
    Income,
    Expense,
}

// Modelo de tabela de Transaction
public class TransactionModel
{
    public long Id { get; private set; }
    public string Description { get; set; } = string.Empty;
    public TransactionType TransactionType { get; set; }
    public Decimal Amount { get; set; }

    // Chave estrageira da relação entre Person
    public long PersonId { get; set; }

    // Relação N:1 com Person
    public PersonModel Person { get; set; }
}
