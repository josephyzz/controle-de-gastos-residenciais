// Hooks de Transaction. Utilizado para tratar chamadas de api.
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

// Função para chamada de transactions com base na person
const get_transactions_by_person_id = async (personId: number) => {
  const { data } = await api.get(`/person/${personId}/transactions`);
  return data;
}

export const useTransactionData = (personId?: number) => {

  const transactions = useQuery({
    // Cria cache de transactions para cada pessoa
    queryKey: ["transactions", personId],
    // A exclamação indica que a função só será chamada se o valor existir
    queryFn: () => get_transactions_by_person_id(personId!),
    enabled: personId !== undefined,
  });


  return { transactions };
};
