//Controller para de rotas Person
namespace GastosResidencias.Routes;

using GastosResidencias.Models;

public static class PersonRoute
{
    //This sinaliza que é um metodo de extensão app
    public static void PersonRoutes(this WebApplication app)
    {
        app.MapGet("/person", () => new PersonModel("Miguel", 20));
    }
}
