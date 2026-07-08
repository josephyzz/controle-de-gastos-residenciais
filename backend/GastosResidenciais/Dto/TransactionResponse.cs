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
