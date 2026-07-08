import React from "react";
import type { PersonSummaryResponse } from "../../interfaces/PersonResponse";
import { formatCurrency } from "../../utils/formatCurrency";

interface TableProps {
  data: PersonSummaryResponse[];
  onDelete?: (personId: number) => void;
}

const PersonTable: React.FC<TableProps> = ({ data, onDelete }) => {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft bg-gray-300 border-b border-default">
          <tr>
            <th className="px-6 py-3 font-medium">Id</th>
            <th className="px-6 py-3 font-medium">Nome</th>
            <th className="px-6 py-3 font-medium">Idade</th>
            <th className="px-6 py-3 font-medium">Total Receita</th>
            <th className="px-6 py-3 font-medium">Total Despesa</th>
            <th className="px-6 py-3 font-medium">Lucro</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {data ? (
            data.map((personSummary: PersonSummaryResponse) => (
              <tr
                key={personSummary.id}
                className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
              >

                <td className="px-6 py-4">{personSummary.id}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {personSummary.name}
                </th>

                <td className="px-6 py-4">{personSummary.age}</td>
                <td className="px-6 py-4">{formatCurrency(personSummary.TotalIncome)}</td>
                <td className="px-6 py-4">{formatCurrency(personSummary.TotalExpense)}</td>
                <td className="px-6 py-4">{formatCurrency(personSummary.Balance)}</td>

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
