import { Warning } from "@phosphor-icons/react/dist/ssr";
import { ReactNode } from "react";

export const LoadingComponent = () => (
  <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
    <div className="mt-4 flex flex-col items-center gap-4">
      <div className="size-4 animate-spin rounded-sm border-2 border-primary-500"></div>
      <p className="text-sm text-bg-100/80">Carregando...</p>
    </div>
  </div>
);

export const ErrorComponent: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">

    <div className="flex items-center gap-2 text-actions-red">
      <Warning className="size-4"/>
      <p>{message}</p>
    </div>
  </div>
);

export const EmptyListComponent: React.FC<{
  children: ReactNode;
  text: string;
}> = ({ children, text }) => (
  <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
    <h1 className="text-lg font-bold text-bg-100">
      Parece que ainda não tem nada! 😥
    </h1>
    <p className="w-[400px]">{text}</p>
    {children}
  </div>
);
