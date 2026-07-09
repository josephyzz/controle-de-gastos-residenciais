// DTO: Data transformer object
// Também chamado de interface.
// É uma forma de tipar dados principalmente de JSON

namespace GastosResidencias.Dto;

using GastosResidencias.Models;

public record TransactionResponse(
    long Id,
    string Description,
    decimal Amount,
    TransactionType TransactionType
);

public record TransactionAllSummaryTotal(
    int TotalPeople,
    decimal TotalAllIncome,
    decimal TotalAllExpense,
    decimal TotalAllBalance
);
