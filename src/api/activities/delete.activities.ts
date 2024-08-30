import axiosInstance from "../axiosInstance";
import { ResponseBack, Activities } from "../promise.type";

interface ParamsDeleteActivities {
  id: string;
}

interface ResponseDeleteActivities extends ResponseBack {
  result: Activities;
}

export const DeleteActivitie = async ({
  id,
}: ParamsDeleteActivities): Promise<ResponseDeleteActivities> => {
  const result = await axiosInstance.delete<ResponseDeleteActivities>(`/activities/${id}`);

  return result.data;
};
