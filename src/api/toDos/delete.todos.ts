import axiosInstance from "../axiosInstance";
import { ResponseBack, ToDos } from "../promise.type";

interface ParamsDeleteToDo {
  id: string;
}

interface ResponseDeleteToDo extends ResponseBack {
  result: ToDos;
}

export const DeleteToDos = async ({
  id,
}: ParamsDeleteToDo): Promise<ResponseDeleteToDo> => {
  const result = await axiosInstance.delete<ResponseDeleteToDo>(`/todos/${id}`);

  return result.data;
};
