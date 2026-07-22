"use client";

import TaskBreakdownChart from "./TaskBreakdownChart";

export default function UserReportCard({ report }) {
  if (!report) return null;

  return (
    <div className="bg-white border rounded-xl p-5 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {report.userName}
        </h2>

        <p className="text-sm text-gray-500 capitalize">
          {report.userRole}
        </p>
      </div>


      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat
          label="Total Tasks"
          value={report.totalAssignedTasks}
        />

        <Stat
          label="Completed"
          value={report.completedTasks}
        />

        <Stat
          label="In Progress"
          value={report.inProgressTasks}
        />

        <Stat
          label="To Do"
          value={report.todoTasks}
        />

        <Stat
          label="Review"
          value={report.reviewTasks}
        />
      </div>


      {/* Completion */}
      <div>
        <p className="text-sm text-gray-500 mb-2">
          Completion Rate
        </p>

        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{
              width: `${report.completionPercentage}%`,
            }}
          />
        </div>

        <p className="text-sm text-gray-700 mt-2">
          {report.completionPercentage}% completed
        </p>
      </div>


      {/* Chart */}
      <TaskBreakdownChart
        data={{
          completedTasks: report.completedTasks,
          inProgressTasks: report.inProgressTasks,
          todoTasks: report.todoTasks,
          reviewTasks: report.reviewTasks,
        }}
      />


      {/* Task List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Assigned Tasks
        </h3>

        <div className="space-y-3">
          {report.tasks?.length > 0 ? (
            report.tasks.map((task, index) => (
              <div
                key={index}
                className="border rounded-lg p-3"
              >
                <p className="font-medium text-gray-800">
                  {task.taskTitle}
                </p>

                <p className="text-sm text-gray-500">
                  Project: {task.projectName}
                </p>

                <p className="text-sm text-gray-500">
                  Status: {task.status}
                </p>

                <p className="text-sm text-gray-500">
                  Priority: {task.priority}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No assigned tasks found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


function Stat({ label, value }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="text-xl font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}