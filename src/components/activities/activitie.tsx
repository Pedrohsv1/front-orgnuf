"use client";
import React, { useEffect, useState } from "react";
import { Activities } from "@/api/promise.type";
import { ButtonFavorite } from "./button-favorite";
import { ButtonCheck } from "./button-check";
import { ActivitiesLink } from "./activities-link";
import { Progress } from "../ui/progress";
import { DialogDeleteActivities } from "./dialog-activities/dialog-delete-activities";
import { DialogPatchActivitie } from "./dialog-activities/dialog-patch-activitie";
import dayjs from "dayjs";

dayjs.locale("pt-br");

type TypeToDoContext = {
  activitie: Activities;
};

export const ActivitieContext = React.createContext<null | TypeToDoContext>(
  null,
);

export const Activitie = (act: Activities) => {
  const [activitie] = useState(act);
  const [days, setDays] = useState(0);
  const [dayToGo, setDaysToGo] = useState(0);

  useEffect(() => {
    if (activitie.DeadLineStart && activitie.DeadLineEnd) {
      const now = dayjs();
      const deadLineEnd = dayjs(activitie.DeadLineEnd);
      const deadLineStart = dayjs(activitie.DeadLineStart);
    
      if (now.isBefore(deadLineEnd)) {
        const deadlineTime = deadLineEnd.diff(deadLineStart, 'day');
        const fromNow = deadLineEnd.diff(now, 'day');
    
        setDaysToGo(fromNow);
    
        return () => setDays(((deadlineTime - fromNow) / deadlineTime) * 100);
      } else {
        setDays(-1);
      }
    }
  }, []);

  return (
    <ActivitieContext.Provider value={{ activitie }}>
      <div className="flex items-center gap-4 rounded-lg p-4 hover:bg-primary-500/5">
        {/* IsDone */}
        <div className="size-8">
          <ButtonCheck />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <div className="space-y-2">
            <div className="flex w-full items-center gap-2">
              <p className="text-sm">
                {activitie.DeadLineStart &&
                  new Date(activitie.DeadLineStart).toLocaleDateString(
                    "pt-BR",
                    {
                      month: "numeric",
                      year: "numeric",
                      day: "2-digit",
                    },
                  )}
              </p>
              <div className="flex w-[50%] items-center gap-4 justify-center">
                {days > 0 && !activitie.isCheck ? (
                  <>
                    <Progress value={Math.trunc(days)} className="w-[65%]" />

                    <p
                      className={`text-sm transition-all ${days <= 50 ? "text-actions-green" : days <= 75 ? "text-actions-yellow" : "text-actions-red"}`}
                    >
                      {dayToGo > 1 ? `${dayToGo} Dias` : `${dayToGo} Dia`}
                    </p>
                  </>
                ) : (
                  <div
                    className={`h-5 w-[100%] rounded-lg text-center ${activitie.isCheck ? "bg-actions-green/10 text-actions-green" : "bg-actions-red/10 text-actions-red"}`}
                  >
                    <p className="text-sm">
                      {activitie.isCheck ? "Feito" : "Atrasado"}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm">
                {activitie.DeadLineEnd &&
                  new Date(activitie.DeadLineEnd).toLocaleDateString("pt-BR", {
                    month: "numeric",
                    year: "numeric",
                    day: "2-digit",
                  })}
              </p>
            </div>
            <h4
              className={`text-base font-bold text-bg-100 ${activitie.isCheck && "line-through"} ${activitie.isFavorite && "bg-primary-500/5"}`}
            >
              {activitie.title}
            </h4>
            {activitie.content && (
              <p
                className={`text-sm text-bg-100 ${activitie.isCheck && "line-through"} ${activitie.isFavorite && "bg-primary-500/5"}`}
              >
                {activitie.content}
              </p>
            )}
            <p className="text-sm text-bg-100/50">
              Criado em{" "}
              {new Date(activitie.createdAt).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <ActivitiesLink links={activitie.links} />
          </div>
          <div className="flex items-center gap-2">
            {/* Favorite */}
            <ButtonFavorite />
            {/* Edit */}
            <DialogPatchActivitie />
            {/* Delete */}
            <DialogDeleteActivities />
          </div>
        </div>
      </div>
    </ActivitieContext.Provider>
  );
};
