import { Star } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { useMutation } from "react-query";
import { Dispatch, useContext } from "react";
import { ActivitiesContext } from "./activities";
import { PatchActivities } from "@/api/activities/patch.activities";
import { ActivitieContext } from "./activitie";

export const ButtonFavorite = () => {
  const { toast } = useToast();
  const activities = useContext(ActivitiesContext);
  const activitieContext = useContext(ActivitieContext);

  const mutatePatchActivitie = useMutation(PatchActivities, {
    onSuccess: (data) => {
      toast({
        title: "Tarefa Atualizada",
        description: `${data.result.title} - ${data.result.isFavorite ? "Favoritado" : "Desfavoritado"}`,
      });
      activities?.refetch();
    },
  });

  function ChangeFavorite() {
    if (activities && activitieContext) {
      mutatePatchActivitie.mutate({
        id: activitieContext?.activitie.id,
        isFavorite: !activitieContext?.activitie.isFavorite,
      });
    } else {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar atualizar a atividade",
      });
    }
  }
  return (
    <ButtonIcon typeButtonIcon="favorite" onClick={ChangeFavorite}>
      {mutatePatchActivitie.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-yellow" />
      ) : (
        <Star
          className={`${activitieContext?.activitie.isFavorite && "text-actions-yellow"} size-4`}
          weight={`${activitieContext?.activitie.isFavorite ? "fill" : "regular"}`}
        />
      )}
    </ButtonIcon>
  );
};
