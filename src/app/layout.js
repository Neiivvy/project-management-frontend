import "./globals.css";

export const metadata = {
  title: "Project-Clarity",
  description: "Collaborative Project Management Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-slate-50 text-gray-900 min-h-screen flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, #EAF3FF 0%, #F5F9FF 50%, #FFFFFF 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
