import React from "react";
import type { TransactionResponse } from "../../interfaces/TransactionResponse";
import { formatCurrency } from "../../utils/formatCurrency";

// Props, se refere a dados que passam por parametros
// Aqui é a tipagem dos dados do componente
interface TableProps {
  transactions: TransactionResponse[] | null;
  headers: string[];
}

// Componente de tabela para listagem de transações
const TransactionTable: React.FC<TableProps> = ({ transactions, headers }) => {
  const typeTransaction = ["Receita", "Despesa"]
  return (
    <div className="relative  overflow-x-auto  rounded-xl ">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft bg-[var(--color-primary)] border-b border-default">
          <tr className="divide-x divide-gray-900 font-bold text-white">
            {/*Percorre todos os header e adicionar a tag com o estilo*/}
            {
              headers.map((header: string) => (
                <th key={header} className="px-6 py-3 text-center">{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {/*Verifico se transaction existe, e em seguindo percorro*/}
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="bg-[var(--color-ternary)] border-b border-gray-500 divide-x last:border-b-0"
              >
                <td className="p-4">{transaction.id}</td>
                <td className="p-4">{transaction.description}</td>
                <td className="p-4">{formatCurrency(transaction.amount)}</td>
                <td className="p-4">{typeTransaction[transaction.transactionType]}</td>
              </tr>

            ))
          ) : (
            <tr>
              {/*Caso não exista transaction, será exibido esse conteúdo*/}
              <td colSpan={7} className="h-32 bg-[var(--color-ternary)] text-center">
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum item registrado.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  );
};

export default TransactionTable;
