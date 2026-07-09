
// interface para tipagem de dados de Request
export interface TransactionRequest {
  description: string,
  transactionType: number,
  amount: number,
  personId: number,
}
