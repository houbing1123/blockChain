import { useFetch } from "../hooks/useFetch";

interface Knowledge {
    model: string;
    prompt: string;
    [key: string]: any;
}
export const getGPTReponse = async (data: Knowledge) => {
  const response = await useFetch("http://localhost:11434/api/generate",{
   body: JSON.stringify(data),
   method: "POST",
  });
  return response;
}