import React from "react";
import type { SummaryResponse } from "../../interfaces/PersonResponse";
import { formatCurrency } from "../../utils/formatCurrency";
import { ArrowRight, Trash2 } from "lucide-react";

interface TableProps {
  summary: SummaryResponse | null;
  headers: string[];
  onDelete?: (personId: number) => void;
  onDetail?: (personId: number) => void;
}

const PersonTable: React.FC<TableProps> = ({ summary, headers, onDetail, onDelete }) => {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft  rounded-xl ">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft bg-[var(--color-primary)] border-b border-default">
          <tr className="divide-x divide-gray-900 font-bold text-white">
            {/*Percorre todos os header e adicionar a tag com o estilo*/}
            {
              headers.map((header: string) => (
                <th className="px-6 py-3 text-center">{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {summary?.data && summary?.data.length > 0 ? (
            summary.data.map((personSummary) => (
              <tr
                key={personSummary.id}
                className="bg-[var(--color-ternary)] border-b border-gray-500 divide-x last:border-b-0"
              >
                <td className="p-4">{personSummary.id}</td>
                <td className="p-4">{personSummary.name}</td>
                <td className="p-4">{personSummary.age}</td>
                <td className="p-4">
                  {formatCurrency(personSummary.totalIncome)}
                </td>
                <td className="p-4">
                  {formatCurrency(personSummary.totalExpense)}
                </td>
                <td className="p-4">
                  {formatCurrency(personSummary.balance)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onDelete?.(personSummary.id)}
                      className="text-[var(--color-red)/0.5] hover:text-[var(--color-red)] transition-colors cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                      title="Ver detalhes"
                      onClick={() => onDetail?.(personSummary.id)}
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>

            ))
          ) : (
            <tr>
              <td colSpan={7} className="h-32 bg-[var(--color-ternary)] text-center">
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum item registrado.
                </p>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot className="bg-[var(--color-primary)] text-white font-semibold">
          <tr className="divide-x divide-gray-900 ">
            <td className="px-6 py-4">
              Totais:
            </td>

            <td colSpan={2} className="px-6 text-center py-4">{summary?.summaryTotal.totalPeople} de pessoa(s)</td>

            <td className="p-4">
              {formatCurrency(summary?.summaryTotal.totalAllIncome ?? 0)}
            </td>

            <td className="p-4">
              {formatCurrency(summary?.summaryTotal.totalAllExpense ?? 0)}
            </td>

            <td className="p-4">
              {formatCurrency(summary?.summaryTotal.totalAllBalance ?? 0)}
            </td>

            <td></td>
          </tr>
        </tfoot>
      </table>
    </div >
  );
};

export default PersonTable;
