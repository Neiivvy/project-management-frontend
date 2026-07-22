"use client";

export default function OverviewCards({ overview }) {
  if (!overview) return null;

  const cards = [
    {
      title: "Total Users",
      value: overview.users.total,
    },
    {
      title: "Members",
      value: overview.users.members,
    },
    {
      title: "Project Managers",
      value: overview.users.projectManagers,
    },
    {
      title: "Admins",
      value: overview.users.admins,
    },
    {
      title: "Total Projects",
      value: overview.projects.total,
    },
    {
      title: "Active Projects",
      value: overview.projects.active,
    },
    {
      title: "Total Tasks",
      value: overview.tasks.total,
    },
    {
      title: "Completed Tasks",
      value: overview.tasks.completed,
    },
    {
      title: "In Progress Tasks",
      value: overview.tasks.inProgress,
    },
    {
      title: "Todo Tasks",
      value: overview.tasks.todo,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            border
            rounded-xl
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}