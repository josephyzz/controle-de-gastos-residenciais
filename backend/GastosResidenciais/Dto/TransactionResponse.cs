using GastosResidencias.Models;

public record TransactionResponse(
    long Id,
    string Description,
    TransactionType TransactionType,
    decimal Amount,
    long PersonId
);
