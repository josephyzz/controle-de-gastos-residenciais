import { Button } from "./components/button/Button"

function App() {

  return (
    <>
      <div className="h-screen bg-gray-100 w-full">
        <div className="flex justify-around items-center pt-12">
          <h1 className="font-bold italic text-amber-500 text-xl">Controle de Gastos Residencial</h1>
          <Button>Cadastrar Pessoa</Button>
        </div>
      </div>
    </>
  )
}

export default App
