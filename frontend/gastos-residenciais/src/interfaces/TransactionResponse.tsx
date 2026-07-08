export interface TransactionResponse {
  id: number;
  name: string;
  amount: number;
  transactionType: number;
}

export interface AllSummaryTotalResponse {
  totalPeople: number;
  totalAllIncome: number;
  totalAllExpense: number;
  totalAllBalance: number;
}
