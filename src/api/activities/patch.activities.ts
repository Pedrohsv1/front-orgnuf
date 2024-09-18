import { ILink } from "@/components/forms/form-activitie-patch";
import axiosInstance from "../axiosInstance";
import { ResponseBack, Activities } from "../promise.type";

interface ParamsPatchActivities {
  id: string;
  title?: string;
  content?: string;
  fineshedAt?: any;
  isFavorite?: boolean;
  isCheck?: boolean;
  DeadLineStart?: Date;
  DeadLineEnd?: Date;
  links?: ILink[];
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
  DeadLineEnd,
  DeadLineStart,
  links,
}: ParamsPatchActivities): Promise<ResponsePatchActivities> => {
  const result = await axiosInstance.patch<ResponsePatchActivities>(
    `/activities/${id}`,
    {
      title,
      content,
      fineshedAt,
      isCheck,
      isFavorite,
      DeadLineStart,
      DeadLineEnd,
      links: {
        create: links,
      },
    },
  );

  return result.data;
};
