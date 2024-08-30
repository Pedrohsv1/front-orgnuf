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
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { FormToDo } from "../../forms/form-to-do";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface DialogCreate {
  refetch: any;
}

export const DialogCreateTodo = ({ refetch }: DialogCreate) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonIcon typeButtonIcon="success">
          <Plus className="size-4" />
        </ButtonIcon>
      </DialogTrigger>
      <DialogContent className="border-bg-700 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma tarefa para seu dia ou semana que seja simples e direta.
          </DialogDescription>
        </DialogHeader>
        <FormToDo
          setOpen={() => {
            refetch();
            setOpen(!open);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
