import { useNavigate, useParams } from "react-router-dom";
import { useTransactionData } from "../hooks/useTransactionData";
import { Button } from "../components/button/Button";
import { useState } from "react";
import { AxiosError } from "axios";
import CreateTransactionModal from "../components/modal/CreateTransactionModal";
import type { TransactionRequest } from "../interfaces/TransactionRequest";
import useTransactionMutate from "../hooks/useTransactionMutate";
import TransactionTable from "../components/table/TransactionTable";
import { ArrowLeft } from "lucide-react";

function TransactionPage() {
  // Id que vem pelo paramento (url/navigate)
  const { personId } = useParams<{ personId: string }>();
  // Verifico Id antes de converter, envitando erros quando é undefined
  const id = personId ? Number(personId) : undefined;
  // Hooks para listagem e criação de transaction
  const { transactions } = useTransactionData(id);
  const { createTransaction } = useTransactionMutate(id);

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // Função para criar Transação. 
  // Como não foi necessario, não chamei o onSuccess
  function handleSubmit(data: TransactionRequest) {
    createTransaction.mutate(data, {
      onError(error) {
        const axiosError = error as AxiosError<{ message: string }>;

        alert(
          axiosError.response?.data.message ??
          "Ocorreu um erro ao cadastrar a transação."
        );
      },
    });
  }

  return (
    <>
      <div className="h-screen bg-white w-full p-12">
        <div className="flex flex-col md:flex-row justify-around items-center pt-12 pb-5">
          <div className="flex items-center">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Voltar"
              onClick={() => navigate("/")}
            >
              <ArrowLeft
                size={24}
                className="text-[var(--color-primary)]"
              />
            </button>
            <h1 className="font-extrabold italic text-center mb-4 md:mb-0 text-[var(--color-primary)] text-2xl">
              Transações de {transactions?.data?.name}
            </h1>
          </div>
          <Button onClick={() => setOpenModal(true)}>Registrar Transação</Button>
        </div>
        <div className="w-4/5 pb-40 m-auto">
          {/*Tabela de transação*/}
          {transactions.data && (
            <TransactionTable
              headers={["Id", "Descrição", "Valor", "Tipo"]}
              transactions={transactions?.data?.transactions}
            />
          )}
        </div>
      </div>
      {/* Logica para abrir modal de criação de transaction */}
      {
        openModal && (
          <CreateTransactionModal
            personId={id!}
            onClose={() => setOpenModal(false)}
            onSubmit={handleSubmit}
          />
        )
      }

    </>
  );
}

export default TransactionPage;
