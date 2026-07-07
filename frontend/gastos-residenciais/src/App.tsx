import { Button } from "./components/button/Button"
import { usePersonData } from "./hooks/usePersonData";

function App() {
  const { summary } = usePersonData();
  console.log(summary.data);
  return (
    <>
      <div className="h-screen bg-gray-100 w-full">
        <div className="flex justify-around items-center pt-12">
          <h1 className="font-bold italic text-amber-500 text-xl">Controle de Gastos Residencial</h1>
          <Button>Cadastrar Pessoa</Button>
        </div>
        <div>
        </div>
      </div>
    </>
  )
}

export default App
