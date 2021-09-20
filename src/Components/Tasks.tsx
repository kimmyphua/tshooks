import React, { ReactElement } from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completedTask(taskNameToDelete: string): void;
}

export default function Tasks({ task, completedTask }: Props) {
  return (
    <div>
      <div className="task">
        <div className="content">
          <span>{task.taskName}</span>
          <span>{task.deadline}</span>
        </div>
        <button onClick={() => completedTask(task.taskName)}>X</button>
      </div>
    </div>
  );
}
