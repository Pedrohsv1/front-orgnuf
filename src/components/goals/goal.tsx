import React from "react";
import { ButtonCheck } from "./button-check";
import { Goals } from "@/api/promise.type";
import { ConfettiButton } from "../magicui/confetti";

type TypeToDoContext = {
  goal: Goals;
};

export const GoalContext = React.createContext<null | TypeToDoContext>(null);

const Goal: React.FC<Goals> = (goal: Goals) => {
  return (
    <GoalContext.Provider value={{ goal }}>
      <div className="goal flex items-center gap-4 rounded-lg p-4 hover:bg-primary-500/5">
        {/* IsDone */}
        <div className="size-8">
          <ButtonCheck />
        </div>

        <h4 className={`text-sm text-bg-100 ${goal.isCompleted && "line-through"}`}>
          {goal.title}
        </h4>
      </div>
    </GoalContext.Provider>
  );
};

export default Goal;
