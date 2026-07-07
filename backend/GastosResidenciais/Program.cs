using GastosResidencias.Database;
using GastosResidencias.Routes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DataContext>();

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

app.PersonRoutes();
app.TransactionRoutes();

app.UseHttpsRedirection();
app.Run();
