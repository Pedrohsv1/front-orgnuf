import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { ButtonIcon } from "../../button/button-icon";
import { Trash, Warning } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../../button/button";
import { useMutation } from "react-query";
import { DeleteToDos } from "@/api/toDos/delete.todos";
import { useToast } from "../../ui/use-toast";
import { ToDoContext } from "../toDos";
import { ToDoC } from "../toDo";

export const DialogDeleteTodo = () => {
  const { toast } = useToast();
  const contextValue = useContext(ToDoC);
  const contextAllValue = useContext(ToDoContext);

  const { mutate, isLoading, isSuccess, isError } = useMutation(DeleteToDos, {
    onSuccess: () => {
      toast({
        title: "Tarefa Deletada",
      });
      contextAllValue?.refetch();
      setOpen(!open);
    },
  });

  const [open, setOpen] = useState(false);

  async function Delete() {
    if (contextValue) {
      mutate({
        id: contextValue?.todo.id,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonIcon className="bg-transparent" typeButtonIcon="delete">
          <Trash className={`size-4`} />
        </ButtonIcon>
      </DialogTrigger>
      <DialogContent className="border-bg-700 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-actions-red">
            Deletar Tarefa{" "}
          </DialogTitle>
          <DialogDescription>
            Atenção: Você está prestes a deletar uma tarefa, esta ação é
            irreversível.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className={`bg-actions-red transition-all hover:bg-actions-red/80 active:bg-actions-red/90 ${isError ? "bg-transparent" : isSuccess && "bg-actions-green"} ${isSuccess || isError || isLoading ? "pointer-events-none" : ""}`}
            disabled={isLoading || isSuccess || isError}
            onClick={Delete}
          >
            {isLoading ? (
              <div className="size-4 animate-pulse rounded-full border-2 border-bg-100" />
            ) : isSuccess ? (
              <Trash className="size-4 text-bg-100" />
            ) : isError ? (
              <div className="flex items-center gap-2">
                <Warning className="size-4 text-actions-red" />
                <p className="text-sm text-bg-100/80">
                  Tente novamente mais tarde
                </p>
              </div>
            ) : (
              "Deletar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
