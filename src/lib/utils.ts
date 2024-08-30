import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function useUserAuthenticated() {
  let token: string | null | boolean = null;

  await useEffect(() => {
    const gettoken = localStorage.getItem("token");
    token = isLogged(gettoken);
  }, []);

  function isLogged(token: string | null): boolean {
    if (token) {
      const decoded: { exp: number } = jwtDecode(token);
      const dateNow = new Date().getTime() / 1000;

      if (decoded.exp && dateNow < decoded.exp) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } else {
      return false;
    }
  }

  return token;
}

export function DaysDiference(data1: Date, data2: Date) {
  // Converter as datas para o formato de milissegundos
  const data1Ms = data1.getTime();
  const data2Ms = data2.getTime();

  // Calcular a diferença em milissegundos
  const diferencaMs = Math.abs(data2Ms - data1Ms);

  // Converter a diferença de milissegundos para dias
  const diferencaDias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

  return diferencaDias;
}
