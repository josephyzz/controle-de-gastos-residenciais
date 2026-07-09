// DTO: Data transformer object
// Também chamado de interface.
// É uma forma de tipar dados principalmente de JSON

namespace GastosResidencias.Dto;

using GastosResidencias.Models;

public record TransactionRequest(
    string description,
    TransactionType transactionType,
    Decimal amount,
    long personId
);
