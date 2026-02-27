import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex gap-6 border-b">
      <Link to="/" className="font-semibold">
        Home
      </Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/api-demo">API Demo</Link>
    </nav>
  );
}