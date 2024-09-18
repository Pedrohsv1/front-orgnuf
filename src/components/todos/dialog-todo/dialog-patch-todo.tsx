import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { ButtonIcon } from "../../button/button-icon";
import { Pencil } from "@phosphor-icons/react/dist/ssr";
import { FormToDoPatch } from "../../forms/form-to-do-patch";
import { ToDos } from "@/api/promise.type";

export const DialogPatchTodo = () => {

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonIcon className="bg-transparent">
          <Pencil className="size-4" />
        </ButtonIcon>
      </DialogTrigger>
      <DialogContent className="border-bg-700 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma tarefa para seu dia ou semana que seja simples e direta.
          </DialogDescription>
        </DialogHeader>
        <FormToDoPatch
          
        />
      </DialogContent>
    </Dialog>
  );
};
