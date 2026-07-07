// Hooks de Person. Utilizado para tratar chamadas de api.
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";


const fetch_person_summary = async () => {
  const { data } = await api.get("/person/summary");
  return data;
}

export const usePersonData = () => {

  const summary = useQuery({
    queryKey: ["summary", "people"],
    queryFn: fetch_person_summary,
  });


  return { summary };
};
