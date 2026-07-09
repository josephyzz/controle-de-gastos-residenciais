//src/components/modal/CreateTransactionModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../button/Button";
import type { TransactionRequest } from "../../interfaces/TransactionRequest";

// Tipagem dos dados do componente
interface ModalProps {
  onClose: () => void;
  personId: number;
  onSubmit: (data: TransactionRequest) => void;
}
// Modal usado para criação de um novo registro de transação
export default function CreateTransactionModal({
  onClose,
  personId,
  onSubmit,
}: ModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState(0)

  // Função que realiza a passagem de dados para criação,
  // Também realiza validação dos dados e avisos.
  const handleSubmit = () => {

    // Verifica se os campos não estão vazios
    if (!description || !amount) {
      return alert("Campos não podem ser vazios");
    }
    if (Number.isNaN(amount.trim()) || Number(amount.trim()) <= 0) {
      alert("Informe um valor numérico válido.");
      return;
    }

    onSubmit({
      description: description,
      transactionType: transactionType,
      amount: Number(amount.trim()), // trim, remove espaços em brancos
      personId: personId
    })
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99">
      <div className="bg-white p-6 rounded-xl w-4/5 lg:max-w-xl shadow-xl">
        {/* Header: Parte superior do modal, com o titulo e a ação de fechar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-[var(--color-primary)] font-bold">
            Registrar Transação
          </h2>
          <button onClick={onClose}>
            <X size={30} />
          </button>
        </div>

        {/* Form: Formulario para o preenchimento dos dados */}
        <div>
          {/* Nome */}
          <div className="mb-2">
            <label className="font-semibold">Descrição</label>
            <input
              value={description}
              maxLength={20}
              placeholder="Ex.: Salário"
              className="w-full p-2 border rounded"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="font-semibold">Tipo de transação.</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Receita</option>
              <option value={1}>Despesa</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="font-semibold">Valor</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              step="0.01"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
