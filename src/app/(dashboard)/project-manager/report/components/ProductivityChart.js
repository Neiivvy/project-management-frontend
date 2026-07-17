export default function ProductivityChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-8">Monthly Productivity</h2>

      <div className="flex justify-between items-end h-72">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center gap-3">
            <div
              className="bg-green-600 w-12 rounded-t-lg"
              style={{
                height: `${item.value * 2}px`,
              }}
            ></div>

            <span className="font-semibold">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
