
// Hooks de Person. Utilizado para tratar chamadas de api.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { PersonRequest } from "../interfaces/PersonRequest";

const create_person = async (personRequest: PersonRequest) => {
  const { data } = await api.post("/person", personRequest);
  return data;
}
const delete_person = async (personId: number) => {
  const { data } = await api.delete(`/person/${personId}`);
  return data;
}

const usePersonMutate = () => {
  const queryClient = useQueryClient();

  // CREATE
  const createPerson = useMutation({
    mutationFn: create_person,
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
      queryClient.invalidateQueries({
        queryKey: ["summary"],
        exact: false,
      });
    },
  });
  return {
    deletePerson, createPerson
  };
};

export default usePersonMutate;
