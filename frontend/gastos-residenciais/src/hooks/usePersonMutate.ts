// Hooks de Person. Utilizado para tratar chamadas de api.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { PersonRequest } from "../interfaces/PersonRequest";

// Função para criar person, no formato personRequest
const create_person = async (personRequest: PersonRequest) => {
  const { data } = await api.post("/person", personRequest);
  return data;
}

// Função de deletação de pessoa, passando o seu identificador
const delete_person = async (personId: number) => {
  const { data } = await api.delete(`/person/${personId}`);
  return data;
}

// Hooks para fluxos de modificações
const usePersonMutate = () => {
  const queryClient = useQueryClient();

  // CREATE
  const createPerson = useMutation({
    mutationFn: create_person,
    // Se for sucesso, invalida a querie,
    // obrigando realização de novas chamadas para API (method get)
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["summary"],
        exact: false,
      });
    }
  });

  // DELETE 
  const deletePerson = useMutation({
    mutationFn: delete_person,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["summary-total"] });
    },
  });
  return {
    deletePerson, createPerson
  };
};

export default usePersonMutate;
