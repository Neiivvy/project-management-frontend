import {
  FaGithub,
  FaGithubSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const columns = [
  {
    heading: "Product",
    links: ["Features", "Tasks", "Team Collab", "Dashboard"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API reference", "Blog"],
  },
  {
    heading: "Company",
    links: ["About", "How it works", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#f7fcf8] bg-[#eaf3ff] mt-20">
      <div className="mx-auto max-w-7xl px-6 py-9 sm:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0f5238]/10">
                <FaGithubSquare size={16} className="text-[#0f5238]" />
              </span>
              <span className="text-base font-semibold text-[#181d19]">
                Co-Work
              </span>
            </div>

            <p className="mt-3 text-sm text-[#404943]">
              Plan, track, and ship work — one workspace for the whole team.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="text-[#404943] hover:text-[#0f5238] transition-colors"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="text-[#404943] hover:text-[#0f5238] transition-colors"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[#404943] hover:text-[#0f5238] transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#181d19]">
                {col.heading}
              </h3>

              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#404943] hover:text-[#0f5238] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#bfc9c1] pt-6 sm:flex-row">
          <p className="text-xs text-[#404943]">
            © {new Date().getFullYear()} Co-Work, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}