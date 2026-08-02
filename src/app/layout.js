import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { MdDescription } from "react-icons/md";
import AuthInitializer from "@/components/AuthInitializer";
export const metadata = {
  title: {
    default: "Co-Work ",
    template: "%s | Co-Work",
    description: "This is the project management system built with MERN.",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jakarta.variable} bg-slate-50 text-gray-900 min-h-screen flex flex-col`}
      >
        <AuthInitializer />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
