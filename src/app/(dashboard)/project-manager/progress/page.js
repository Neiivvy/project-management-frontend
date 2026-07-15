import TaskBoard from "../tasks/components/TaskBoard";
import { tasksData } from "../tasks/data/mockdata";

export default function ProgressPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Task Progress</h1>

        <p className="text-gray-500">
          Monitor task status and approve completed work.
        </p>
      </div>

      <TaskBoard tasks={tasksData} />
    </div>
  );
}
