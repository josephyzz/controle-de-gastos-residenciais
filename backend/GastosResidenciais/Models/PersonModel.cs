namespace GastosResidencias.Models;

public class PersonModel
{
    public PersonModel(string name, int age)
    {
        Name = name;
        Age = age;
    }

    //private set: O campo só será alterado pelo proprio Model.
    public string Name { get; private set; } = string.Empty;
    public long Id { get; init; } // init = Id pelo construtor.
    public int Age { get; set; }
}
