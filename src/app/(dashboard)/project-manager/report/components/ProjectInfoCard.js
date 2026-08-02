import { FaUserTie, FaUsers, FaCalendarAlt, FaCircle } from "react-icons/fa";

const STATUS_STYLES = {
  "not started": "bg-gray-100 text-gray-600",
  "in progress": "bg-[#faf1e2] text-[#a8711f]",
  "on track": "bg-[#e8f2ee] text-[#0f5238]",
  "at risk": "bg-[#fbeaea] text-[#b3413a]",
  completed: "bg-[#e8f2ee] text-[#0f5238]",
  "on hold": "bg-gray-100 text-gray-600",
};

function statusStyle(status) {
  return (
    STATUS_STYLES[(status || "").toLowerCase()] || "bg-gray-100 text-gray-600"
  );
}

export default function ProjectInfoCard({ report }) {
  return (
    <div className=" bg-white rounded-2xl border border-gray-100 p-6 ">
      <div className=" flex flex-wrap items-center justify-between gap-3 mb-5 ">
        <div>
          <p className=" text-xs font-semibold tracking-wider uppercase text-[#0f5238]/60 mb-1 ">
            Project
          </p>

          <h2 className=" text-xl font-bold text-[#10231b] ">
            {report.projectName}
          </h2>
        </div>

        <span
          className={` inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(report.status)} `}
        >
          <FaCircle className="text-[6px]" />
          {report.status}
        </span>
      </div>

      <div className=" grid sm:grid-cols-3 gap-4 pt-5 border-t border-gray-100 ">
        <div className="flex items-center gap-3">
          <div className=" flex items-center justify-center w-9 h-9 rounded-lg bg-[#e8f2ee] text-[#0f5238] shrink-0 ">
            <FaUserTie className="text-sm" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Manager</p>
            <p className="text-sm font-medium text-[#10231b] truncate">
              {report.manager}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className=" flex items-center justify-center w-9 h-9 rounded-lg bg-[#e8f2ee] text-[#0f5238] shrink-0 ">
            <FaUsers className="text-sm" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Team Size</p>
            <p className="text-sm font-medium text-[#10231b]">
              {report.teamSize} members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className=" flex items-center justify-center w-9 h-9 rounded-lg bg-[#e8f2ee] text-[#0f5238] shrink-0 ">
            <FaCalendarAlt className="text-sm" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Deadline</p>
            <p className="text-sm font-medium text-[#10231b]">
              {new Date(report.deadline).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
