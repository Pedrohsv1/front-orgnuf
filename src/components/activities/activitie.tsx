"use client";
import React, { useEffect, useState } from "react";
import { Activities } from "@/api/promise.type";
import { ButtonFavorite } from "./button-favorite";
import { ButtonCheck } from "./button-check";
import { DialogDeleteTodo } from "../todos/dialog-todo/dialog-delete-todo";
import { ActivitiesLink } from "./activities-link";
import { DaysDiference } from "@/lib/utils";
import { Progress } from "../ui/progress";

export const Activitie = (act: Activities) => {
  const [favorite, setIsFavorite] = useState(act.isFavorite);
  const [fineshed, setIsFinished] = useState(act.isCheck);
  const [activitie] = useState(act);
  const [days, setDays] = useState(0);
  const [dayToGo, setDaysToGo] = useState(0);

  useEffect(() => {
    if (activitie.DeadLineStart && activitie.DeadLineEnd) {
      if (new Date() < new Date(activitie.DeadLineEnd)) {
        const deadLineEnd = new Date(activitie.DeadLineEnd);
        const deadLineStart = new Date(activitie.DeadLineStart);
        const deadlineTime = DaysDiference(deadLineStart, deadLineEnd);
        const fromNow = DaysDiference(new Date(), deadLineEnd);

        setDaysToGo(fromNow);

        const timer = setTimeout(
          () => setDays(((deadlineTime - fromNow) / deadlineTime) * 100),
          500,
        );

        return () => clearTimeout(timer);
      } else {
        setDays(101);
      }
    }
  }, []);

  return (
    <div className="todo flex items-center gap-4 rounded-lg p-4 hover:bg-primary-500/5">
      {/* IsDone */}
      <ButtonCheck
        id={activitie.id}
        fineshedAt={fineshed}
        setFineshedAt={setIsFinished}
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex w-full items-center gap-2">
            <p className="text-sm">
              {activitie.DeadLineStart &&
                new Date(activitie.DeadLineStart).toLocaleDateString("pt-BR", {
                  month: "numeric",
                  year: "numeric",
                  day: "2-digit",
                })}
            </p>
            <div className="flex w-[40%] items-center gap-4">
              {days < 100 ? (
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
                  className={`h-5 w-[100%] rounded-lg text-center ${fineshed ? "bg-actions-green/10 text-actions-green" : "bg-actions-red/10 text-actions-red"}`}
                >
                  <p className="text-sm">{fineshed ? "Feito" : "Atrasado"}</p>
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
            className={`text-base font-bold text-bg-100 ${fineshed && "line-through"} ${favorite && "bg-primary-500/5"}`}
          >
            {activitie.title}
          </h4>
          {activitie.content && (
            <p
              className={`text-sm text-bg-100 ${fineshed && "line-through"} ${favorite && "bg-primary-500/5"}`}
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
          <ButtonFavorite
            id={activitie.id}
            favorite={favorite}
            setFavorite={setIsFavorite}
          />
          {/* Edit */}
          {/* Delete */}
          <DialogDeleteTodo id={activitie.id} />
        </div>
      </div>
    </div>
  );
};
