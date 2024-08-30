import axiosInstance from "../axiosInstance";
import { ResponseBack, ToDos } from "../promise.type";

interface ParamsPatchToDo {
  id: string;
  title?: string;
  content?: string;
  fineshedAt?: any;
  isFavorite?: boolean;
  isCheck?: boolean;
}

interface ResponsePatchToDo extends ResponseBack {
  result: ToDos;
}

export const PatchToDos = async ({
  id,
  content,
  fineshedAt,
  isFavorite,
  title,
  isCheck,
}: ParamsPatchToDo): Promise<ResponsePatchToDo> => {
  const result = await axiosInstance.patch<ResponsePatchToDo>(`/todos/${id}`, {
    title,
    content,
    fineshedAt,
    isCheck,
    isFavorite,
  });

  return result.data;
};
