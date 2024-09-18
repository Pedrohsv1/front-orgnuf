import { Check } from "@phosphor-icons/react/dist/ssr";
import { ButtonIcon } from "../button/button-icon";
import { useToast } from "../ui/use-toast";
import { useMutation } from "react-query";
import { useContext } from "react";
import { GoalsContext } from "./goals";
import { GoalContext } from "./goal";
import { PatchGoals } from "@/api/goals/patch.goals";
import confetti from "canvas-confetti";

export const ButtonCheck = () => {
  const { toast } = useToast();
  const contextValue = useContext(GoalContext);
  const contextAllValues = useContext(GoalsContext);
  const glassesCool = confetti.shapeFromText({ text: '😎'});

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [glassesCool],
    scalar: 1.2,
  };

  function shoot(x: number, y: number) {
    const origin = {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    }

    confetti({
      ...defaults,
      particleCount: 30,
      origin,
    });
  
    confetti({
      ...defaults,
      particleCount: 5,
      shapes: ['square'],
      origin,
    });
  
    confetti({
      ...defaults,
      particleCount: 15,
      scalar: 1/2,
      shapes: ['circle'],
      origin,
    });
  }
  


  const mutatePatchGoal = useMutation(PatchGoals, {
    onSuccess: (data) => {
      contextAllValues?.refetch();

      toast({
        title: "Ótimo trabalho",
        description: `${data.result.isCheck ? "Ótimo trabalho concluindo esse obejtivo!" : "De volta ao trabalho"}`,
      });
    },
  });

  function ChangeCheck(event: React.MouseEvent<HTMLButtonElement>) {
    if (contextValue) {
      mutatePatchGoal.mutate({
        id: contextValue?.goal.id,
        isCheck: !contextValue?.goal.isCheck,
        fineshedAt: new Date(),
      });

      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      shoot(x, y);
    }
  }
  return (
    <ButtonIcon typeButtonIcon="success" onClick={ChangeCheck} className={`relative ${contextValue?.goal.isCompleted ? 'bg-actions-green/10': ''}`}>
      {mutatePatchGoal.isLoading ? (
        <div className="size-4 animate-pulse rounded-full border-2 border-actions-green" />
      ) : (
        <Check
          className={`size-4 ${contextValue?.goal.isCompleted && "text-actions-green"}`}
        />
      )}
    </ButtonIcon>
    
  );
};
