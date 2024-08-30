import axiosInstance from "../axiosInstance";
import { ResponseBack, ToDos } from "../promise.type";

interface PostToDoParams {
  title: string;
  content?: string;
}

interface PostToDoResponse extends ResponseBack {
  result: ToDos;
}

export const PostToDo = async ({
  content,
  title,
}: PostToDoParams): Promise<PostToDoResponse> => {
  const data = await axiosInstance.post<PostToDoResponse>("todos", {
    title,
    content,
  });

  return data.data;
};
