export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-[#181d19]">{title}</h1>
        {subtitle && <p className="text-sm text-[#697268] mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}