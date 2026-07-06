namespace GastosResidencias.Models;

public class PersonModel
{
    //private set: O campo só será alterado pelo proprio Model.
    public long Id { get; private set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }

    public ICollection<TransactionModel> Transactions { get; set; } = new List<TransactionModel>();
}
