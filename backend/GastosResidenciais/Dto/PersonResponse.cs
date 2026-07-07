namespace GastosResidencias.Dto;

public record PersonSummaryResponse(
    long Id,
    string Name,
    int Age,
    decimal TotalIncome,
    decimal TotalExpense,
    decimal Balance
);
