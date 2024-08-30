import axiosInstance from "../axiosInstance";
import { ResponseBack, Activities } from "../promise.type";

interface ParamsPatchActivities {
  id: string;
  title?: string;
  content?: string;
  fineshedAt?: any;
  isFavorite?: boolean;
  isCheck?: boolean;
}

interface ResponsePatchActivities extends ResponseBack {
  result: Activities;
}

export const PatchActivities = async ({
  id,
  content,
  fineshedAt,
  isFavorite,
  title,
  isCheck,
}: ParamsPatchActivities): Promise<ResponsePatchActivities> => {
  const result = await axiosInstance.patch<ResponsePatchActivities>(
    `/activities/${id}`,
    {
      title,
      content,
      fineshedAt,
      isCheck,
      isFavorite,
    },
  );

  return result.data;
};
