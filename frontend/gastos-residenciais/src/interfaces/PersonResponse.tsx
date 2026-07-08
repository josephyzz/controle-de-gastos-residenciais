import type { AllSummaryTotalResponse, TransactionResponse } from './TransactionResponse';

export interface PersonSummaryResponse {
  id: number;
  name: string;
  age: number;
  totalIncome: number;
  balance: number;
  totalExpense: number;
}

export interface SummaryResponse {
  data: PersonSummaryResponse[];
  summaryTotal: AllSummaryTotalResponse;
}

export interface PersonTransactionResponse {
  id: number;
  name: string;
  age: number;
  transaction: TransactionResponse[];
}
