const links = [
  {
    label: "GitHub",
    href: "https://github.com/aadhityamenon",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aadhityamenon",
  },
  {
    label: "Email",
    href: "mailto:aadhityamenon31@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-24">
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400">
          © {new Date().getFullYear()} Aadhitya Menon
        </span>
        <ul className="flex items-center gap-6">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-mono)] text-xs text-stone-400 hover:text-stone-900 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}