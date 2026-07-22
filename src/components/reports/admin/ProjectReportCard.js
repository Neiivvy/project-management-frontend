"use client";

import TaskBreakdownChart from "./TaskBreakdownChart";

export default function ProjectReportCard({ report }) {
  if (!report) return null;

  return (
    <div className="bg-white border rounded-xl p-5 space-y-6">
      {/* Project Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {report.projectName}
        </h2>

        <p className="text-sm text-gray-500">
          Manager: {report.manager}
        </p>

        <p className="text-sm text-gray-500 capitalize">
          Status: {report.status}
        </p>

        <p className="text-sm text-gray-500">
          Deadline:{" "}
          {report.deadline
            ? new Date(report.deadline).toLocaleDateString()
            : "No deadline"}
        </p>
      </div>


      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          label="Team Size"
          value={report.teamSize}
        />

        <Stat
          label="Total Tasks"
          value={report.totalTasks}
        />

        <Stat
          label="Completed"
          value={report.completedTasks}
        />

        <Stat
          label="Progress"
          value={`${report.completionPercentage}%`}
        />
      </div>


      {/* Completion Progress */}
      <div>
        <p className="text-sm text-gray-500 mb-2">
          Project Completion
        </p>

        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{
              width: `${report.completionPercentage}%`,
            }}
          />
        </div>
      </div>


      {/* Task Chart */}
      <TaskBreakdownChart
        data={{
          completedTasks: report.completedTasks,
          inProgressTasks: report.inProgressTasks,
          todoTasks: report.todoTasks,
          reviewTasks: report.reviewTasks,
        }}
      />


      {/* Tasks by Member */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Team Performance
        </h3>

        <div className="space-y-3">
          {Object.entries(report.tasksByMember || {}).length > 0 ? (
            Object.entries(report.tasksByMember).map(
              ([member, stats]) => (
                <div
                  key={member}
                  className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between gap-2"
                >
                  <p className="font-medium text-gray-800">
                    {member}
                  </p>

                  <div className="text-sm text-gray-500">
                    Assigned: {stats.assigned} | Completed:{" "}
                    {stats.completed}
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-sm text-gray-500">
              No team data available.
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