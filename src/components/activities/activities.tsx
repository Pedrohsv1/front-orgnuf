import React from "react";
import { DialogCreateTodo } from "../todos/dialog-todo/dialog-create-todo";
import { useQuery } from "react-query";
import { ScrollArea } from "../ui/scroll-area";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GetActivities } from "@/api/activities/get.activities";
import { Activitie } from "./activitie";
import { DialogCreateActivitie } from "./dialog-activities/dialog-create-activities";

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

  useGSAP(() => {
    gsap.to(".todo", {
      translateX: "0",
      stagger: 0.02,
    });
  }, [data]);

  return (
    <ActivitieContext.Provider value={{ refetch }}>
      {isLoading || isError ? (
        <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
          {isLoading ? (
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="size-4 animate-spin rounded-sm border-2 border-primary-500"></div>
              <p className="text-sm text-bg-100/80">Carregando...</p>
            </div>
          ) : (
            isError && (
              <div>
                <h2 className="text-base font-bold text-actions-red">
                  Ocorre algum erro ;/
                </h2>
              </div>
            )
          )}
        </div>
      ) : isSuccess && data.result.length == 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 overflow-hidden border border-bg-800 p-8 text-center">
          <h1 className="text-lg font-bold text-bg-100">
            Parece que ainda não tem tarefas! 😥
          </h1>
          <p className="w-[400px]">
            Crie uma tarefa clicando no botão abaixo e comece a ter mais
            produtividade. 😁
          </p>

          <DialogCreateTodo refetch={refetch} />
        </div>
      ) : (
        isSuccess && (
          <ScrollArea className="flex flex-col gap-4 overflow-hidden border border-bg-800 p-8">
            <div className="mb-4 flex items-center gap-4 px-4">
              <DialogCreateActivitie refetch={refetch} />
              <h1 className="text-lg font-bold text-bg-100">Tarefas</h1>
            </div>

            <div>
              {data.result.map((act) => (
                <div key={act.id} className="todo translate-x-[-100%]">
                  <Activitie {...act} />
                </div>
              ))}
            </div>
          </ScrollArea>
        )
      )}
    </ActivitieContext.Provider>
  );
};
