import React from "react";
import { DialogCreateTodo } from "../todos/dialog-todo/dialog-create-todo";
import { useQuery } from "react-query";
import { ScrollArea } from "../ui/scroll-area";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GetActivities } from "@/api/activities/get.activities";
import { Activitie } from "./activitie";
import { DialogCreateActivitie } from "./dialog-activities/dialog-create-activities";
import { Warning } from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(useGSAP);

interface IActivitieContext {
  refetch: any;
}

export const ActivitieContext = React.createContext<null | IActivitieContext>(
  null,
);

export const ActivitiesList = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    "activities",
    GetActivities,
  );

  const LoadingComponent = () => (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="size-4 animate-spin rounded-sm border-2 border-primary-500"></div>
        <p className="text-sm text-bg-100/80">Carregando...</p>
      </div>
    </div>
  );

  const ErrorComponent: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
      <h2 className="text-base font-bold text-actions-red">
        Ocorreu algum erro ;/
      </h2>
      <div className="flex items-center gap-2 text-actions-red">
        <Warning size={24} />
        <p>{message}</p>
      </div>
    </div>
  );

  const EmptyListComponent = () => (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
      <h1 className="text-lg font-bold text-bg-100">
        Parece que ainda não tem atividades! 😥
      </h1>
      <p className="w-[400px]">
        Crie uma atividade clicando no botão abaixo e comece a ter mais
        produtividade. 😁
      </p>

      <DialogCreateTodo refetch={refetch} />
    </div>
  );

  const SuccessComponent = () => {
    return (
      <ScrollArea className="flex flex-col gap-4 overflow-hidden border border-bg-800 p-8">
        <div className="mb-4 flex items-center gap-4 px-4">
          <DialogCreateActivitie refetch={refetch} />
          <h1 className="text-lg font-bold text-bg-100">Atividades</h1>
        </div>

        <div>
          {data?.result.map((act) => (
            <div key={act.id} className="act">
              <Activitie {...act} />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <ActivitieContext.Provider value={{ refetch }}>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent message="Tente novamente mais tarde" />
      ) : isSuccess && data.result.length == 0 ? (
        <EmptyListComponent />
      ) : (
        isSuccess && <SuccessComponent />
      )}
    </ActivitieContext.Provider>
  );
};
