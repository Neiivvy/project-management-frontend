"use client";

export default function TopPMTable({ topProjectManagers }) {
  if (!topProjectManagers || topProjectManagers.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-5">
        <p className="text-gray-500 text-sm">
          No project manager data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Top Project Managers
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-sm font-medium text-gray-500">
                Project Manager
              </th>

              <th className="py-3 text-sm font-medium text-gray-500">
                Projects Managed
              </th>
            </tr>
          </thead>

          <tbody>
            {topProjectManagers.map((pm, index) => (
              <tr
                key={index}
                className="border-b last:border-none"
              >
                <td className="py-3 text-gray-800">
                  {pm.pmName}
                </td>

                <td className="py-3 text-gray-800">
                  {pm.projectCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}