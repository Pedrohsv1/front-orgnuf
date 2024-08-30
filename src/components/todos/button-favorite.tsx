import { Star } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { PatchToDos } from "@/api/toDos/patch.todos";
import { useMutation } from "react-query";
import { Dispatch, useContext } from "react";
import { ToDoContext } from "./toDos";

interface Params {
  id: string;
  favorite: boolean;
  setFavorite: Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonFavorite = ({ id, favorite, setFavorite }: Params) => {
  const { toast } = useToast();
  const contextValue = useContext(ToDoContext);

  const mutatePatchToDo = useMutation(PatchToDos, {
    onSuccess: (data) => {
      toast({
        title: "Tarefa Atualizada",
        description: `${data.result.title} - ${data.result.isFavorite ? "Favoritado" : "Desfavoritado"}`,
      });
      contextValue?.refetch();
    },
  });

  function ChangeFavorite() {
    mutatePatchToDo.mutate({
      id,
      isFavorite: !favorite,
    });
    setFavorite(!favorite);
  }
  return (
    <ButtonIcon typeButtonIcon="favorite" onClick={ChangeFavorite}>
      {mutatePatchToDo.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-yellow" />
      ) : (
        <Star
          className={`size-4 ${favorite && "text-actions-yellow"}`}
          weight={`${favorite ? "fill" : "regular"}`}
        />
      )}
    </ButtonIcon>
  );
};