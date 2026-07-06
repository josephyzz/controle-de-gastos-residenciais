namespace GastosResidencias.Models;

public class TransactionModel
{
    public long Id { get; private set; }
    public string Description { get; init; } = string.Empty;
    public string TransactionType { get; init; }
    public Decimal Amount { get; init; } // init: Recebe pelo construtor

    public long PersonId { get; set; }
    public PersonModel Person { get; set; }
}
