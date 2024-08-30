"use client";
import React, { useState } from "react";
import { ButtonIcon } from "../button/button-icon";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { ToDos } from "@/api/promise.type";
import { ButtonFavorite } from "./button-favorite";
import { ButtonCheck } from "./button-check";
import { DialogPatchTodo } from "./dialog-todo/dialog-patch-todo";
import { DialogDeleteTodo } from "./dialog-todo/dialog-delete-todo";

export const ToDo = (todo: ToDos) => {
  const [favorite, setIsFavorite] = useState(todo.isFavorite);
  const [fineshed, setIsFinished] = useState(todo.isCheck);
  const [toDo, setToDo] = useState(todo);

  return (
    <div className="todo flex items-center gap-4 rounded-lg p-4 hover:bg-primary-500/5">
      {/* IsDone */}
      <ButtonCheck
        id={toDo.id}
        fineshedAt={fineshed}
        setFineshedAt={setIsFinished}
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <h4
            className={`text-base font-bold text-bg-100 ${fineshed && "line-through"} ${favorite && "bg-primary-500/5"}`}
          >
            {toDo.title}
          </h4>
          {toDo.content && (
            <p
              className={`text-sm text-bg-100 ${fineshed && "line-through"} ${favorite && "bg-primary-500/5"}`}
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
          <ButtonFavorite
            id={toDo.id}
            favorite={favorite}
            setFavorite={setIsFavorite}
          />
          {/* Edit */}
          <DialogPatchTodo setToDo={setToDo} todo={todo} />
          {/* Delete */}
          <DialogDeleteTodo id={toDo.id} />
        </div>
      </div>
    </div>
  );
};
