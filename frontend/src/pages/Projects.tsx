const projects = [
  {
    index: "01",
    title: "AI Misinformation Detector",
    description:
      "Built an NLP-based model using logistic regression to detect misinformation with 92.3% accuracy. Designed the full data pipeline from preprocessing to evaluation.",
    tech: ["Python", "scikit-learn", "NLP", "Logistic Regression"],
    link: null,
  },
  {
    index: "02",
    title: "Hey, Blue! — Auth & Data Systems",
    description:
      "Shipped production-ready authentication and data-handling features in React during an internship. Focused on reliability and clean API integration.",
    tech: ["React", "TypeScript", "REST APIs"],
    link: null,
  },
  {
    index: "03",
    title: "Personalized Learning AI",
    description:
      "Led development of an AI-driven system for personalized knowledge retrieval and adaptive learning paths.",
    tech: ["Python", "Machine Learning", "Data Pipelines"],
    link: null,
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen pt-14">
      <div className="max-w-5xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="border-b border-stone-200 pb-8 mb-16">
          <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 tracking-widest uppercase">
            Work
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl mt-4">
            Projects
          </h1>
        </div>

        {/* Project list */}
        <div className="divide-y divide-stone-200">
          {projects.map(({ index, title, description, tech, link }) => (
            <div
              key={index}
              className="py-12 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 group"
            >
              {/* Index */}
              <span className="font-[family-name:var(--font-mono)] text-xs text-stone-300 pt-1">
                {index}
              </span>

              {/* Title + description */}
              <div>
                <h2 className="text-xl font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                  {title}
                </h2>
                <p className="mt-3 text-stone-500 text-sm leading-relaxed max-w-sm">
                  {description}
                </p>
              </div>

              {/* Tech + link */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="font-[family-name:var(--font-mono)] text-xs px-2 py-1 border border-stone-200 text-stone-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-xs text-stone-400 underline underline-offset-4 hover:text-stone-900 transition-colors self-start"
                  >
                    View →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}