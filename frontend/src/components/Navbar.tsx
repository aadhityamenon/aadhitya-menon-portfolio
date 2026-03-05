import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/api-demo", label: "API Demo" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-[family-name:var(--font-mono)] text-sm font-medium tracking-tight hover:opacity-60 transition-opacity"
        >
          Home
        </Link>
        <ul className="flex items-center gap-8">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm tracking-wide transition-all duration-200 ${
                  pathname === to
                    ? "text-stone-900 font-medium"
                    : "text-stone-400 hover:text-stone-900"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}