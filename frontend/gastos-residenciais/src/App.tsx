import { Button } from "./components/button/Button"
import PersonTable from "./components/table/PersonTable";
import { usePersonData } from "./hooks/usePersonData";

function App() {
  const { summary } = usePersonData();
  console.log(summary.data);
  return (
    <>
      <div className="h-screen bg-gray-100 w-full p-12">
        <div className="flex justify-around items-center pt-12 pb-5">
          <h1 className="font-bold italic text-amber-500 text-xl">Controle de Gastos Residencial</h1>
          <Button>Cadastrar Pessoa</Button>
        </div>
        <PersonTable data={summary.data} onDelete={() => { }} />
      </div>
    </>
  )
}

export default App
