export type ResponseBack = {
  status: string;
  message: string;
  result: any;
};

export type ErrorBack = {
  response: {
    data: {
      status: string;
      message: string;
      err: {
        response: {
          message: string;
          error: string;
          statusCode: number;
        };
        status: number;
        options: {};
        message: string;
        name: string;
      };
    };
  };
};

export type ToDos = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  fineshedAt: Date;
  isFavorite: boolean;
  authorId: string;
  isCheck: boolean;
};

export interface Activities {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  fineshedAt: any;
  isCheck: boolean;
  isFavorite: boolean;
  authorId: string;
  DeadLineStart?: Date;
  DeadLineEnd?: Date;
  links: Links[];
}

export interface Links {
  id: string;
  name: string;
  link: string;
  activitiesId: string;
}

export interface Goals {
  id: string;
  title: string;
  isCheck: boolean;
  fineshedAt: Date;
  days: number[];
  isCompleted: boolean;
}
