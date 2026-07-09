namespace GastosResidencias.Models;

// Modelo de Person
public class PersonModel
{
    //private set: O campo só será alterado pelo proprio Model.
    public long Id { get; private set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }

    // Relação 1:N com transaction
    public ICollection<TransactionModel> Transactions { get; set; } = new List<TransactionModel>();
}
