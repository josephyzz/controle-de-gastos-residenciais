import { useState } from "react";
import { Button } from "./components/button/Button"
import CreatePersonModal from "./components/modal/CreatePersonModal";
import PersonTable from "./components/table/PersonTable";
import { usePersonData } from "./hooks/usePersonData";
import usePersonMutate from "./hooks/usePersonMutate";
import type { PersonRequest } from "./interfaces/PersonRequest";

function App() {
  const { summary } = usePersonData();
  const { createPerson, deletePerson } = usePersonMutate();
  const [openModal, setOpenModal] = useState(false);

  function handleSubmit(personRequest: PersonRequest) {
    createPerson.mutate(personRequest,
      {
        onError() {
          alert("Ocorreu um erro, tente novamente.")
        }
      })
  }
  // Função para deletar registro de pessoa, com confirmação.
  function handleDelete(personId: number) {
    const confirmed = window.confirm(
      `Deseja realmente excluir o registro ${personId}?`
    );
    if (!confirmed) {
      return;
    }
    deletePerson.mutate(personId);
  }


  return (
    <>
      <div className="h-screen bg-white w-full p-12">
        <div className="flex flex-col md:flex-row justify-around items-center pt-12 pb-5">
          <h1 className="font-extrabold italic text-center mb-4 md:mb-0 text-[var(--color-primary)] text-2xl">
            Controle de Gastos Residencial
          </h1>
          <Button onClick={() => setOpenModal(true)}>Cadastrar Pessoa</Button>
        </div>
        <div className="w-4/5 m-auto">
          <PersonTable
            data={summary.data}
            headers={['Id', 'Nome', 'Idade', 'Total de Receita', 'Total de Despesas', 'Saldo', 'Ação']}
            onDelete={handleDelete}
          />
        </div>
        {openModal && (
          <CreatePersonModal
            onClose={() => { setOpenModal(false) }}
            onSubmit={handleSubmit} />
        )}
      </div>
    </>
  )
}

export default App
