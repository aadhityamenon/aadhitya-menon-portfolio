import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex-1 pt-14 flex items-center">
      <div className="max-w-5xl mx-auto px-8 py-32 w-full">
        <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 tracking-widest uppercase">
          404
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl mt-4">
          Page not found
        </h1>
        <p className="mt-6 text-stone-500 text-lg max-w-xl leading-relaxed">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block px-6 py-3 bg-stone-900 text-stone-50 text-sm tracking-wide hover:bg-stone-700 transition-colors"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
