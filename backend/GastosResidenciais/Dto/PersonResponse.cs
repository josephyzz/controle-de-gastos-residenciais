// DTO: Data transformer object
// Também chamado de interface.
// É uma forma de tipar dados principalmente de JSON

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
