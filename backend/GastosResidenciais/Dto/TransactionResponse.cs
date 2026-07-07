using GastosResidencias.Models;

public record TransactionResponse(
    long Id,
    string Description,
    decimal Amount,
    TransactionType TransactionType
);
