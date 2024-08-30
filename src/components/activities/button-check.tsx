import { Check } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { useMutation } from "react-query";
import { Dispatch } from "react";
import { PatchActivities } from "@/api/activities/patch.activities";

interface Params {
  id: string;
  fineshedAt: boolean;
  setFineshedAt: Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonCheck = ({ id, fineshedAt, setFineshedAt }: Params) => {
  const { toast } = useToast();
  const mutatePatchActivitie = useMutation(PatchActivities, {
    onSuccess: (data) => {
      toast({
        title: "Tarefa Atualizada",
        description: `${data.result.title} - ${data.result.isCheck ? "Feito" : "De volta ao trabalho, parece que você ainda n fez essa :("}`,
      });
    },
  });

  function ChangeCheck() {
    mutatePatchActivitie.mutate({
      id,
      fineshedAt: new Date(),
      isCheck: !fineshedAt,
    });
    setFineshedAt(!fineshedAt);
  }
  return (
    <ButtonIcon typeButtonIcon="success" onClick={ChangeCheck}>
      {mutatePatchActivitie.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-green" />
      ) : (
        <Check className={`size-4 ${fineshedAt && "text-actions-green"}`} />
      )}
    </ButtonIcon>
  );
};
