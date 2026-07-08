// Hooks de Person. Utilizado para tratar chamadas de api.
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

// Função para chamada de resumo de pessoas.
const fetch_person_summary = async () => {
  const { data } = await api.get("/person/summary");
  return data;
}

export const usePersonData = () => {

  const summary = useQuery({
    // QueryKey é usado para validar ou não um certo dado de requisição
    queryKey: ["summary"],
    queryFn: fetch_person_summary,
  });


  return { summary };
};
