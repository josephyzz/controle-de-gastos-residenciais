namespace GastosResidencias.Dto;

using GastosResidencias.Models;

public record TransactionRequest(
    string description,
    TransactionType transactionType,
    Decimal amount,
    long personId
);
