// Interfaces, para tipagem de dados
export interface TransactionResponse {
  id: number;
  description: string;
  amount: number;
  transactionType: number;
}

export interface AllSummaryTotalResponse {
  totalPeople: number;
  totalAllIncome: number;
  totalAllExpense: number;
  totalAllBalance: number;
}
