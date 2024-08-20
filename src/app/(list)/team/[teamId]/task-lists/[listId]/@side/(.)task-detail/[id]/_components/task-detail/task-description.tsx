import React from "react";

import { CheckButton } from "@/components/common";

interface TaskDescriptionProps {
  description: string;
  isTaskCompleted: boolean;
  onToggleComplete: () => void;
  isPending: boolean;
}

const TaskDescription = ({
  description,
  isTaskCompleted,
  onToggleComplete,
  isPending,
}: TaskDescriptionProps) => {
  let buttonText = "완료하기";
  if (isPending) {
    buttonText = "처리 중...";
  } else if (isTaskCompleted) {
    buttonText = "완료취소하기";
  }

  return (
    <article className="overflow-wrap-anywhere min-h-200 whitespace-normal break-words text-14-400">
      {description}
      <div className="mt-150 flex justify-end">
        <CheckButton
          variant={isTaskCompleted ? "white" : "primary"}
          onClick={onToggleComplete}
          disabled={isPending}
        >
          {buttonText}
        </CheckButton>
      </div>
    </article>
  );
};

export default TaskDescription;
