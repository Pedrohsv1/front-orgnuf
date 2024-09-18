import { Check, Star } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { PatchToDos } from "@/api/toDos/patch.todos";
import { useMutation } from "react-query";
import { ToDoC } from "./toDo";
import { useContext } from "react";
import { ToDoContext } from "./toDos";

export const ButtonCheck = () => {
  const { toast } = useToast();
  const contextValue = useContext(ToDoC);
  const contextAllValues = useContext(ToDoContext);

  const mutatePatchToDo = useMutation(PatchToDos, {
    onSuccess: (data) => {
      contextAllValues?.refetch();

      toast({
        title: "Ótimo trabalho",
        description: `${data.result.isCheck ? "Ótimo trabalho concluindo essa tarefa!" : "De volta ao trabalho"}`,
      });
    },
  });

  function ChangeCheck() {
    if (contextValue) {
      mutatePatchToDo.mutate({
        id: contextValue?.todo.id,
        isCheck: !contextValue?.todo.isCheck,
        fineshedAt: new Date(),
      });
    }
  }
  return (
    <ButtonIcon typeButtonIcon="success" onClick={ChangeCheck}>
      {mutatePatchToDo.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-green" />
      ) : (
        <Check
          className={`size-4 ${contextValue?.todo.isCheck && "text-actions-green"}`}
        />
      )}
    </ButtonIcon>
  );
};
