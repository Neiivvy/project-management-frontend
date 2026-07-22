"use client";

export default function ProjectSelector({
  projects = [],
  selectedProject,
  onSelect,
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Project Report
      </label>

      <select
        value={selectedProject || ""}
        onChange={(e) => onSelect(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2
          text-gray-800
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      >
        <option value="">
          Select a project
        </option>

        {projects.map((project) => (
          <option
            key={project._id || project.id}
            value={project._id || project.id}
          >
            {project.title || project.name}
          </option>
        ))}
      </select>
    </div>
  );
}