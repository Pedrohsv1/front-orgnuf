import axiosInstance from "../axiosInstance";
import { ResponseBack, Goals } from "../promise.type";

interface GetGoals extends ResponseBack {
  result: Goals[];
}

export const GetGoals = async (): Promise<GetGoals> => {
  const data = await axiosInstance.get<GetGoals>("/goal");
  
  return data.data;
};
