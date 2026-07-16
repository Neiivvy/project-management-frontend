// lib/mappers/project.js

// Same shape used by the projects list page, plus the extra fields
// the detail page needs (full manager object, createdAt, etc).
export function mapProjectDetail(project) {
  return {
    id: project._id,
    name: project.title,
    description: project.description || "No description provided.",

    status: project.status,

    manager: {
      id: project.manager?._id,
      name: project.manager?.name || "Unknown",
      email: project.manager?.email || null,
      avatar: project.manager?.avatar || null,
    },
team:
  project.teamMembers?.map((member) => ({
    id: member._id,
    name: member.name,
    email: member.email || null,
    avatar: member.avatar || null,
    role: member.role || "member",
    availability: member.availability || "available",
  })) || [],

    createdAt: project.createdAt || null,
    dueDate: project.deadline || new Date(),

    // Fake values until backend supports them
    progress: 0,
    priority: "low",
    tasksDone: 0,
    tasksTotal: 0,
  };
}