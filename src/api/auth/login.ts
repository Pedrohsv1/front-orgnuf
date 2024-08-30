import axiosInstance from "../axiosInstance";
import { ResponseBack } from "../promise.type";

interface AuthLogin extends ResponseBack {
  result: {
    token: string;
    usename: string;
  };
}

interface AuthLoginParams {
  username: string;
  password: string;
}

export async function LoginAPI({
  username,
  password,
}: AuthLoginParams): Promise<AuthLogin> {
  const response = await axiosInstance.post<AuthLogin>("/auth/login", {
    username,
    password,
  });

  return response.data;
}
