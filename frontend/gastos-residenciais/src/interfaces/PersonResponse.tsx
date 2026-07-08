import { Decimal } from 'decimal.js';
import type { TransactionResponse } from './TransactionResponse';

export interface PersonSummaryResponse {
  id: number;
  name: string;
  age: number;
  TotalIncome: Decimal;
  TotalExpense: Decimal;
  Balance: Decimal;
}

export interface PersonTransactionResponse {
  id: number;
  name: string;
  age: number;
  transaction: TransactionResponse[];
}
