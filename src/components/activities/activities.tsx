import React from "react";
import { QueryObserverResult, useQuery } from "react-query";
import { ScrollArea } from "../ui/scroll-area";
import { GetActivities } from "@/api/activities/get.activities";
import { Activitie } from "./activitie";
import { DialogCreateActivitie } from "./dialog-activities/dialog-create-activities";
import {
  LoadingComponent,
  ErrorComponent,
  EmptyListComponent,
} from "../defaultStates";

interface IActivitieContext {
  refetch: () => Promise<QueryObserverResult<any, unknown>>;
}

export const ActivitiesContext = React.createContext<null | IActivitieContext>(
  null,
);

export const ActivitiesList = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    {
      queryKey: ["activities"],
      queryFn: GetActivities,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
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
    <ActivitiesContext.Provider value={{ refetch }}>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent message="Tente novamente mais tarde" />
      ) : isSuccess && data.result.length == 0 ? (
        <EmptyListComponent
          text="Crie uma atividade clicando no botão abaixo e comece a ter mais
        produtividade. 😁"
        >
          <DialogCreateActivitie refetch={refetch} />
        </EmptyListComponent>
      ) : (
        isSuccess && <SuccessComponent />
      )}
    </ActivitiesContext.Provider>
  );
};
