namespace GastosResidencias.Dto;

public record PersonSummaryResponse(
    long Id,
    string Name,
    int Age,
    decimal TotalIncome,
    decimal TotalExpense,
    decimal Balance
);

public record PersonTransactionResponse(
    long Id,
    string Name,
    int Age,
    List<TransactionResponse> Transactions
);
