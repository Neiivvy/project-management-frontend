// app/member/projects/[id]/page.jsx

async function getProject(id) {
  const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetailPage({ params }) {
  const { id } = params;
  const project = await getProject(id);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>Status: {project.status}</p>
      <p>Progress: {project.progress}%</p>
      <p>Deadline: {project.deadline}</p>
      <p>Manager: {project.manager}</p>
    </div>
  );
}