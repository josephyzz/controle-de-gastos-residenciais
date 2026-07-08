import { Decimal } from 'decimal.js';
import type { TransactionResponse } from './TransactionResponse';

export interface PersonSummaryResponse {
  id: number;
  name: string;
  age: number;
  totalIncome: number;
  balance: number;
  totalExpense: number;
}

export interface PersonTransactionResponse {
  id: number;
  name: string;
  age: number;
  transaction: TransactionResponse[];
}
