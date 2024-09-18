"use client";
import React, { useState } from "react";
import { ToDos } from "@/api/promise.type";
import { ButtonFavorite } from "./button-favorite";
import { ButtonCheck } from "./button-check";
import { DialogPatchTodo } from "./dialog-todo/dialog-patch-todo";
import { DialogDeleteTodo } from "./dialog-todo/dialog-delete-todo";

type TypeToDoContext = {
  todo: ToDos;
  setToDo: React.Dispatch<React.SetStateAction<ToDos>>;
};

export const ToDoC = React.createContext<null | TypeToDoContext>(null);

export const ToDo = (toDo: ToDos) => {
  const [todo, setToDo] = useState<ToDos>(toDo);

  return (
    <ToDoC.Provider
      value={{
        todo,
        setToDo,
      }}
    >
      <div className="todo flex items-center gap-4 rounded-lg p-4 hover:bg-primary-500/5">
        {/* IsDone */}
        <div className="size-8">
          <ButtonCheck />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4
              className={`text-base font-bold text-bg-100 ${toDo.isCheck && "line-through"} ${toDo.isFavorite && "bg-primary-500/5"}`}
            >
              {toDo.title}
            </h4>
            {toDo.content && (
              <p
                className={`text-sm text-bg-100 ${toDo.isCheck && "line-through"} ${toDo.isFavorite && "bg-primary-500/5"}`}
              >
                {toDo.content}
              </p>
            )}
            <p className="text-sm text-bg-100/50">
              Criado em{" "}
              {new Date(toDo.createdAt).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Favorite */}
            <ButtonFavorite />
            {/* Edit */}
            <DialogPatchTodo />
            {/* Delete */}
            <DialogDeleteTodo />
          </div>
        </div>
      </div>
    </ToDoC.Provider>
  );
};
