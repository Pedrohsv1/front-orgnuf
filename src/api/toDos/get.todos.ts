import axiosInstance from "../axiosInstance";
import { ResponseBack, ToDos } from "../promise.type";

interface GetToDos extends ResponseBack {
  result: ToDos[];
}

export const GetToDos = async (): Promise<GetToDos> => {
  const data = await axiosInstance.get<GetToDos>("/todos");

  return data.data;
};
