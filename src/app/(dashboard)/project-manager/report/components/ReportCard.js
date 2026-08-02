export default function ReportCard({ title, value, icon, accent = "green" }) {
  const accents = {
    green: "bg-[#e8f2ee] text-[#0f5238]",
    amber: "bg-[#faf1e2] text-[#a8711f]",
    indigo: "bg-[#ecedf9] text-[#4c4f9e]",
    slate: "bg-gray-100 text-gray-600",
  };

  return (
    <div className=" group bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_2px_rgba(15,82,56,0.04)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(15,82,56,0.08)] hover:-translate-y-0.5 ">
      <div className=" flex items-start justify-between gap-4 ">
        <div className="min-w-0">
          <p className=" text-[13px] font-medium text-gray-500 tracking-wide ">
            {title}
          </p>

          <h2 className=" text-[28px] leading-tight font-bold text-[#10231b] mt-1 tabular-nums ">
            {value}
          </h2>
        </div>

        <div
          className={` flex items-center justify-center w-11 h-11 rounded-xl text-lg shrink-0 transition-transform duration-200 group-hover:scale-105 ${accents[accent]} `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
