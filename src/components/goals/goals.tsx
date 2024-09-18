import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Goal from "./goal";
import { isError, QueryObserverResult, useQuery } from "react-query";
import {
  LoadingComponent,
  ErrorComponent,
  EmptyListComponent,
} from "../defaultStates";
import { GetGoals } from "@/api/goals/get.goals";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Last15Days } from "../last15Days";

dayjs.locale("pt-br");

interface IGoalsContext {
  refetch: () => Promise<QueryObserverResult<any, unknown>>;
}

export const GoalsContext = React.createContext<null | IGoalsContext>(null);

const GoalsList: React.FC = () => {
  const currentDay = dayjs().format("dddd");
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    {
      queryKey: ["goals"],
      queryFn: GetGoals,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
    
  );

  const SuccessComponent = () => {
    return (
      <div>
        <ScrollArea className="flex flex-col gap-4 overflow-hidden border border-bg-800 p-8">
        <div className="mb-4 flex items-center gap-4 px-4">
          <h1 className="text-lg font-bold text-bg-100 capitalize">{currentDay}</h1>
        </div>

        <div className="">
          {data?.result.map((act) => (
            <div key={act.id} className="act">
              <Goal {...act} />
            </div>
          ))}
        </div>
      </ScrollArea>
      <Last15Days />
      </div>
    );
  };

  return (
    <GoalsContext.Provider value={{ refetch }}>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent message="Tente novamente mais tarde" />
      ) : isSuccess && data.result.length == 0 ? (
        <EmptyListComponent text="Crie um objetivo clicando abaixo... 😁">
          Salve
        </EmptyListComponent>
      ) : (
        isSuccess && <SuccessComponent />
      )}
    </GoalsContext.Provider>
  );
};

export default GoalsList;
