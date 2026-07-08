//src/components/modal/CreatePersonModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../button/Button";
import type { PersonRequest } from "../../interfaces/PersonRequest";

// Tipagem dos dados do componente
interface PersonModalProps {
  onClose: () => void;
  onSubmit: (data: PersonRequest) => void;
}
// Modal usado para criação de um novo registro de pessoa
export default function CreatePersonModal({
  onClose,
  onSubmit,
}: PersonModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  // Função que realiza a passagem de dados para criação,
  // Também realiza validação dos dados e avisos.
  const handleSubmit = () => {
    if (!name) return alert("Nome não pode está vazio");
    if (age <= 0) return alert("Idade deve ser maior que zero.")

    onSubmit({ name: name, age: age })
    onClose();
  }


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-xl w-[95%] w-4/5 lg:max-w-xl shadow-xl">
        {/* Header: Parte superior do modal, com o titulo e a ação de fechar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Cadastrar Pessoa
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form: Formulario para o preenchimento dos dados */}
        <div>
          {/* Nome */}
          <div>
            <label className="font-semibold">Nome</label>
            <input
              value={name}
              className="w-full p-2 border rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Idade Atual</label>
            <input
              value={age}
              min={0}
              max={110}
              type="number"
              className="w-full p-2 border rounded"
              onChange={(e) => setAge(Number(e.target.value))}
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
