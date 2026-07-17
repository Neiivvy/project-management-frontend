export default function ProductivityTable({ teams }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Team Productivity</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Team</th>

            <th className="text-left">Productivity</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="border-b">
              <td className="py-4">{team.team}</td>

              <td>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 rounded-full h-3 w-full">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{
                        width: `${team.productivity}%`,
                      }}
                    ></div>
                  </div>

                  <span>{team.productivity}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
