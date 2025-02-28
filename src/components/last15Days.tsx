import { GetGoalsLast15Days } from "@/api/completions/get-last-15-days";
import dayjs from "dayjs";
import React from "react";
import { useQuery } from "react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { getRandomEmojis } from "@/lib/utils";

export const Last15Days = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["last15days"],
    queryFn: GetGoalsLast15Days,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const today = dayjs();

  // Cria um array com os últimos 15 dias
  const last15Days = Array.from({ length: 15 }, (_, i) => {
    const date = today.subtract(i, "day");
    return date.format("YYYY-MM-DD"); // Formata a data como YYYY-MM-DD
  }).reverse(); // Reverte para que os dias estejam em ordem cronológica

  const getOpacityClass = (percentage) => {
    if (percentage >= 90) return "bg-primary-500/90";
    if (percentage >= 80) return "bg-primary-500/80";
    if (percentage >= 70) return "bg-primary-500/70";
    if (percentage >= 60) return "bg-primary-500/60";
    if (percentage >= 50) return "bg-primary-500/50";
    if (percentage >= 40) return "bg-primary-500/40";
    if (percentage >= 30) return "bg-primary-500/30";
    if (percentage >= 20) return "bg-primary-500/20";
    if (percentage >= 10) return "bg-primary-500/10";
    return "bg-bg-700/50";
  };

  return (
    <div className="flex flex-col gap-4 p-12">
      <h2 className="text-sm font-bold">Últimos 15 dias</h2>
      <div className="flex flex-wrap gap-2">
        {last15Days.map((date) => {
          const completions = data?.result[date];
          const percentage = completions
            ? (completions.count / completions.totalGoals) * 100
            : 0;
          const roundedPercentage = completions
            ? Math.ceil(percentage / 10) * 10
            : 0;
          const emoji = getRandomEmojis(
            data?.result[date]?.goals.length
              ? data?.result[date].goals.length
              : 1,
          );

          return (
            <TooltipProvider key={date}>
              <Tooltip>
                <TooltipTrigger>
                  {isLoading ? (
                    <div className="size-6 animate-pulse rounded-md bg-bg-700/50" />
                  ) : (
                    <div
                      key={date}
                      className={`size-6 ${getOpacityClass(roundedPercentage)} bg-pr flex items-center justify-center rounded-md text-xs`}
                    >
                      {date.substring(8, 10)}
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-bg-100">{date}</p>
                    <p className="text-xs text-bg-100">
                      {completions
                        ? `${completions.count} de ${completions.totalGoals} objetivos`
                        : "Nenhum objetivo 😭"}
                    </p>
                    <div>
                      {completions?.goals.map((goal, index) => (
                        <div key={goal.id} className="flex items-center gap-2">
                          <p className="text-xs text-bg-100">
                            {emoji[index]} {goal.goal.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};
