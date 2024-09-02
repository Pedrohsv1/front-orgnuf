import { create } from "domain";
import axiosInstance from "../axiosInstance";
import { ResponseBack, Activities, Links } from "../promise.type";
import { ILink } from "@/components/forms/form-activitie";

interface PostActivitieParams {
  title: string;
  content?: string;
  DeadLineStart?: Date;
  DeadLineEnd?: Date;
  links?: ILink[];
}

interface PostActivitieResponse extends ResponseBack {
  result: Activities;
}

export const PostActivitie = async ({
  content,
  title,
  DeadLineStart,
  DeadLineEnd,
  links,
}: PostActivitieParams): Promise<PostActivitieResponse> => {
  const data = await axiosInstance.post<PostActivitieResponse>("activities", {
    title,
    content,
    DeadLineStart,
    DeadLineEnd,
    links: {
      create: links,
    },
  });

  return data.data;
};
