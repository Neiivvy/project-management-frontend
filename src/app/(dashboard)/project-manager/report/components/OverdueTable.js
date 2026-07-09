export default function OverdueTable({ tasks }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Overdue Tasks</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Task</th>

            <th>Project</th>

            <th>Member</th>

            <th>Days Late</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="py-4">{task.task}</td>

              <td>{task.project}</td>

              <td>{task.member}</td>

              <td className="text-red-600 font-bold">{task.days} Days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
