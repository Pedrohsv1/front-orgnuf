import { Star } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { PatchToDos } from "@/api/toDos/patch.todos";
import { useMutation } from "react-query";
import { useContext } from "react";
import { ToDoContext } from "./toDos";
import { ToDoC } from "./toDo";

export const ButtonFavorite = () => {
  const { toast } = useToast();
  const contextValue = useContext(ToDoC);
  const contextAllValue = useContext(ToDoContext);

  const mutatePatchToDo = useMutation(PatchToDos, {
    onSuccess: (data) => {
      toast({
        title: "Tarefa Atualizada",
        description: `${data.result.title} - ${data.result.isFavorite ? "Favoritado" : "Desfavoritado"}`,
      });
      contextAllValue?.refetch();
    },
  });

  function ChangeFavorite() {
    if (contextValue) {
      mutatePatchToDo.mutate({
        id: contextValue?.todo.id,
        isFavorite: !contextValue?.todo.isFavorite,
      });
    }
  }
  return (
    <ButtonIcon typeButtonIcon="favorite" onClick={ChangeFavorite}>
      {mutatePatchToDo.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-yellow" />
      ) : (
        <Star
          className={`size-4 ${contextValue?.todo.isFavorite && "text-actions-yellow"}`}
          weight={`${contextValue?.todo.isFavorite ? "fill" : "regular"}`}
        />
      )}
    </ButtonIcon>
  );
};
