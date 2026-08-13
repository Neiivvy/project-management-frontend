// app/(dashboard)/member/projects/[id]/page.jsx

async function getProject(id) {
  const res = await fetch(
    `http://localhost:5000/api/projects/${id}`,
    {
      cache: "no-store",
    }
  );

  if (res.status === 404) return { notFound: true };
  if (!res.ok) return { error: true };

  const json = await res.json();

  return {
    data: json.data,
  };
}

export default async function ProjectDetailPage({ params }) {

  const result = await getProject(params.id);

  if (result.notFound) {
    return (
      <div className="p-8">
        Project not found.
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-8">
        Failed to load project.
      </div>
    );
  }

  const project = result.data;

  return (

    <div className="max-w-5xl mx-auto p-8">

      <div className="bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-between">

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            {project.status}
          </span>

        </div>

        <div className="mt-8">

          <p className="text-gray-500 mb-2">
            Progress
          </p>

          <div className="w-full h-3 rounded-full bg-gray-200">

            <div
              className="bg-green-600 h-3 rounded-full"
              style={{
                width:`${project.progress || 0}%`
              }}
            />

          </div>

          <p className="mt-2 font-semibold">
            {project.progress || 0}%
          </p>

        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">

          <div>

            <h3 className="text-gray-500">
              Deadline
            </h3>

            <p className="font-semibold">
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "Not set"}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500">
              Manager
            </h3>

            <p className="font-semibold">
              {project.manager?.name || "Unassigned"}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500">
              Team Members
            </h3>

            <p className="font-semibold">
              {project.teamMembers?.length || 0}
            </p>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-xl font-bold mb-3">
            Description
          </h2>

          <p className="text-gray-700">
            {project.description}
          </p>

        </div>

      </div>

    </div>

  );

}