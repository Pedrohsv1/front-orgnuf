import React from "react";
import { ToDo } from "./toDo";
import { DialogCreateTodo } from "./dialog-todo/dialog-create-todo";
import { QueryObserverResult, useQuery } from "react-query";
import { GetToDos } from "@/api/toDos/get.todos";
import { ScrollArea } from "../ui/scroll-area";
import {
  LoadingComponent,
  ErrorComponent,
  EmptyListComponent,
} from "../defaultStates";

interface ITodoContext {
  refetch: () => Promise<QueryObserverResult<any, unknown>>;
}

export const ToDoContext = React.createContext<null | ITodoContext>(null);

export const ToDosList = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    {
      queryKey: ["toDos"],
      queryFn: GetToDos,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const SuccessComponent = () => {
    return (
      <ScrollArea className="flex flex-col gap-4 overflow-hidden border border-bg-800 p-8">
        <div className="mb-4 flex items-center gap-4 px-4">
          <DialogCreateTodo refetch={refetch} />
          <h1 className="text-lg font-bold text-bg-100">Tarefas</h1>
        </div>

        <div>
          {data?.result.map((td) => (
            <div key={td.id}>
              <ToDo {...td} />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <ToDoContext.Provider value={{ refetch }}>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent message="Tente novamente mais tarde" />
      ) : isSuccess && data.result.length == 0 ? (
        <EmptyListComponent
          text="Crie uma tarefa clicando no botão abaixo e comece a ter mais
            produtividade. 😁"
        >
          <DialogCreateTodo refetch={refetch} />
        </EmptyListComponent>
      ) : (
        isSuccess && <SuccessComponent />
      )}
    </ToDoContext.Provider>
  );
};
