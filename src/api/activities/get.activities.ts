import axiosInstance from "../axiosInstance";
import { ResponseBack, Activities } from "../promise.type";

interface GetActivities extends ResponseBack {
  result: Activities[];
}

export const GetActivities = async (): Promise<GetActivities> => {
  const data = await axiosInstance.get<GetActivities>("/activities");

  return data.data;
};
