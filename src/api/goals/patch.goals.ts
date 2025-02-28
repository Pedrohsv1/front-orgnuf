import axiosInstance from "../axiosInstance";
import { ResponseBack, Goals } from "../promise.type";

interface ParamsPatchGoal {
  id: string;
  title?: string;
  fineshedAt?: any;
  isCheck?: boolean;
  days?: number[];
}

interface ResponsePatchGoal extends ResponseBack {
  result: Goals;
}

export const PatchGoals = async ({
  id,
  fineshedAt,
  title,
  isCheck,
  days,
}: ParamsPatchGoal): Promise<ResponsePatchGoal> => {
  const result = await axiosInstance.patch<ResponsePatchGoal>(`/goal/${id}`, {
    title,
    fineshedAt,
    isCheck,
    days,
  });

  return result.data;
};
