import { Check, Star } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { PatchToDos } from "@/api/toDos/patch.todos";
import { useMutation } from "react-query";
import { Dispatch } from "react";

interface Params {
  id: string;
  fineshedAt: boolean;
  setFineshedAt: Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonCheck = ({ id, fineshedAt, setFineshedAt }: Params) => {
  const { toast } = useToast();
  const mutatePatchToDo = useMutation(PatchToDos, {
    onSuccess: (data) => {
      toast({
        title: "Tarefa Atualizada",
        description: `${data.result.isCheck} - ${data.result.isCheck ? "Feito" : "De volta ao trabalho"}`,
      });
    },
  }); 

  function ChangeCheck() {
    mutatePatchToDo.mutate({
      id,
      fineshedAt: new Date(),
      isCheck: !fineshedAt,
    });
    setFineshedAt(!fineshedAt);
  }
  return (
    <ButtonIcon typeButtonIcon="success" onClick={ChangeCheck}>
      {mutatePatchToDo.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-green" />
      ) : (
        <Check className={`size-4 ${fineshedAt && "text-actions-green"}`} />
      )}
    </ButtonIcon>
  );
};
