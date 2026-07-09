using GastosResidencias.Database;
using GastosResidencias.Repository;
using GastosResidencias.Routes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrando nosso contexto DB no DI
builder.Services.AddScoped<DataContext>();

// Registrando a classes no container de injeção de dependência.
builder.Services.AddScoped<PersonRepository>();
builder.Services.AddScoped<TransactionRepository>();

// Liberando acesso de cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        policy =>
        {
            policy
                .AllowAnyOrigin() // Permite qualquer origem
                .AllowAnyMethod() // Permite GET, POST, PUT, DELETE, etc.
                .AllowAnyHeader(); // Permite qualquer cabeçalho
        }
    );
});

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Registros das rotas
app.PersonRoutes();
app.TransactionRoutes();

app.UseHttpsRedirection();
app.Run();
