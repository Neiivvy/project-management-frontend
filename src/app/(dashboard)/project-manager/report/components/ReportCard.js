export default function ReportCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className={`w-14 h-14 rounded-lg ${color}`}></div>

      <h2 className="mt-5 text-gray-500">{title}</h2>

      <h1 className="text-4xl font-bold mt-2">{value}</h1>
    </div>
  );
}
