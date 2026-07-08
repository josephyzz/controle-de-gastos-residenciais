import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../button/Button";
import Decimal from "decimal.js";
import type { PersonRequest } from "../../interfaces/PersonRequest";


interface PersonModalProps {
  personData?: PersonRequest;
  onClose: () => void;
  onSubmit: (data: PersonRequest) => void;
}

export default function GoalModal({
  personData,
  onClose,
  onSubmit,
}: PersonModalProps) {
  const [targetAmount, setTargetAmount] = useState<string>("");


  const handleSubmit = () => {
    onClose();
  }


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-xl w-[95%] w-4/5 lg:max-w-xl shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Editar Meta
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 gap-4">
          {/* Valor */}
          <div>
            <label className="font-semibold">Valor da meta</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </div>


          {/* ACTIONS */}
          <div className="flex gap-2 mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg"
            >
              Salvar alteração
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
