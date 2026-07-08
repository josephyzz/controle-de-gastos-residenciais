import { Decimal } from "decimal.js";

export interface TransactionResponse {
  id: number;
  name: string;
  amount: Decimal;
  transactionType: number;
}
