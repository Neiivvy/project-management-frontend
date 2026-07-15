"use client";

export default function TaskBoard({ tasks }) {
  const columns = ["To Do", "Review", "In Progress", "Completed"];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column} className="bg-gray-100 rounded-xl p-5">
          <h2 className="text-xl font-bold mb-5">{column}</h2>

          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <div key={task.id} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold">{task.title}</h3>

                  <p className="text-sm text-gray-500 mt-2">{task.project}</p>

                  <p className="text-sm mt-2">👤 {task.assigned}</p>

                  <p className="text-sm">📅 {task.due}</p>

                  {column === "Completed" && (
                    <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                      Approve Task
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
