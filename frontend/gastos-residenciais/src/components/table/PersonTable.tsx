import React from "react";
import type { PersonSummaryResponse } from "../../interfaces/PersonResponse";
import { formatCurrency } from "../../utils/formatCurrency";

interface TableProps {
  data: PersonSummaryResponse[];
  onDelete?: (personId: number) => void;
}

const PersonTable: React.FC<TableProps> = ({ data, onDelete }) => {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft bg-amber-500 border-b border-default">
          <tr className="divide-x divide-gray-300 font-bold text-white">
            <th className="px-6 py-3 text-center">Id</th>
            <th className="px-6 py-3 text-center">Nome</th>
            <th className="px-6 py-3 text-center">Idade</th>
            <th className="px-6 py-3 text-center">Total Receita</th>
            <th className="px-6 py-3 text-center">Total Despesa</th>
            <th className="px-6 py-3 text-center">Lucro</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data ? (
            data.map((personSummary: PersonSummaryResponse) => (
              <tr
                key={personSummary.id}
                className="odd:bg-neutral-primary even:bg-neutral-secondary-soft divide-x divide-gray-300  border-default"
              >

                <td className="px-6 py-4">{personSummary.id}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {personSummary.name}
                </th>

                <td className="px-6 py-4">{personSummary.age}</td>
                <td className="px-6 py-4">{formatCurrency(personSummary.totalIncome)}</td>
                <td className="px-6 py-4">{formatCurrency(personSummary.totalExpense)}</td>
                <td className="px-6 py-4">{formatCurrency(personSummary.balance)}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete?.(personSummary.id)}
                    className="font-medium text-fg-brand hover:underline cursor-pointer"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (<p>Nenhuma pessoa registrada</p>)
          }
        </tbody>
      </table>
    </div >
  );
};

export default PersonTable;
