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
import { FormActivitie } from "@/components/forms/form-activitie";

interface DialogCreate {
  refetch: any;
}

export const DialogCreateActivitie = ({ refetch }: DialogCreate) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
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
        <FormActivitie
          setOpen={() => {
            refetch();
            setOpen(!open);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
