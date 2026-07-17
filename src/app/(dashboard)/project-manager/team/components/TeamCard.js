import { FaUsers, FaEdit, FaTrash } from "react-icons/fa";

export default function TeamCard({ team }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105">
      <div className="flex justify-between items-center">
        <div className="bg-green-100 p-4 rounded-full">
          <FaUsers className="text-green-600 text-2xl" />
        </div>

        <div className="flex gap-3">
          <button className="text-blue-600 hover:text-blue-800">
            <FaEdit />
          </button>

          <button className="text-red-600 hover:text-red-800">
            <FaTrash />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-5">{team.name}</h2>

      <p className="text-gray-500 mt-2">Team Lead: {team.lead}</p>

      <p className="text-gray-500">Technology: {team.technology}</p>

      <div className="mt-5 flex justify-between">
        <span className="font-semibold">Members</span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {team.members}
        </span>
      </div>
    </div>
  );
}
