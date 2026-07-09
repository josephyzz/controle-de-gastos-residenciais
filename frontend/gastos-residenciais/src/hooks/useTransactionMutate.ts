// Hooks de Transaction. Utilizado para tratar chamadas de api.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { TransactionRequest } from "../interfaces/TransactionRequest";

// Função para criação de transaction
const create_transaction = async (req: TransactionRequest) => {
  const { data } = await api.post("/person/transaction", req);
  return data;
}

const useTransactionMutate = (personId?: number) => {
  const queryClient = useQueryClient();

  // CREATE
  const createTransaction = useMutation({
    mutationFn: create_transaction,
    // Se foi sucesso, cancelo as queries antigas,
    // obrigando realizar novos gets.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", personId!] });
    }
  });

  return { createTransaction };
};

export default useTransactionMutate;
