import { Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { useMutation } from "react-query";
import { Dispatch, useContext } from "react";
import { PatchActivities } from "@/api/activities/patch.activities";
import { ActivitieContext } from "./activitie";
import { ActivitiesContext } from "./activities";

export const ButtonCheck = () => {
  const { toast } = useToast();
  const activitieContext = useContext(ActivitieContext);
  const activities = useContext(ActivitiesContext);

  const mutatePatchActivitie = useMutation(PatchActivities, {
    onSuccess: (data) => {
      activities?.refetch();
      toast({
        title: "Tarefa Atualizada",
        description: `${data.result.title} - ${data.result.isCheck ? "Feito" : "De volta ao trabalho, parece que você ainda n fez essa :("}`,
      });
    },
  });

  function ChangeCheck() {
    if (activities && activitieContext) {
      mutatePatchActivitie.mutate({
        id: activitieContext?.activitie.id,
        isCheck: !activitieContext?.activitie.isCheck,
        fineshedAt: new Date(),
      });
    } else {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar atualizar a atividade",
      });
    }
  }
  return (
    <ButtonIcon
      typeButtonIcon="success"
      onClick={ChangeCheck}
      disabled={mutatePatchActivitie.isLoading || mutatePatchActivitie.isError}
    >
      {mutatePatchActivitie.isLoading ? (
        <div className="h-4 w-4 animate-pulse rounded-full border-2 border-actions-green" />
      ) : mutatePatchActivitie.isError ? (
        <Warning className={`size-4 text-actions-red`} />
      ) : (
        <Check
          className={`size-4 ${activitieContext?.activitie.isCheck && "text-actions-green"}`}
        />
      )}
    </ButtonIcon>
  );
};
