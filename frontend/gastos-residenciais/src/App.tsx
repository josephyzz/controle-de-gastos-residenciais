import { Button } from "./components/button/Button"
import PersonTable from "./components/table/PersonTable";
import { usePersonData } from "./hooks/usePersonData";

function App() {
  const { summary } = usePersonData();
  return (
    <>
      <div className="h-screen bg-white w-full p-12">
        <div className="flex justify-around items-center pt-12 pb-5">
          <h1 className="font-extrabold italic text-[var(--color-primary)] text-2xl">Controle de Gastos Residencial</h1>
          <Button>Cadastrar Pessoa</Button>
        </div>
        <div className="w-4/5 m-auto">
          <PersonTable
            data={null}
            headers={['Id', 'Nome', 'Idade', 'Total de Receita', 'Total de Despesas', 'Saldo', 'Ação']}
            onDelete={() => { }}
          />
        </div>
      </div>
    </>
  )
}

export default App
