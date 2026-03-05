const projects = [
  {
    index: "01",
    title: "AI Misinformation Detector",
    description:
      "Built an NLP-based model using logistic regression to detect misinformation with 92.3% accuracy. Designed the full data pipeline from preprocessing to evaluation. Used by 50+ high school students to enhance their research precision in various fields.",
    tech: ["Python", "scikit-learn", "NLP", "Logistic Regression"],
    link: "https://docs.google.com/document/d/1OAHky6uaVVYbb084GjncF5apxJc-1xMG/edit?usp=sharing&ouid=101104644244540031085&rtpof=true&sd=true",
  },
  {
    index: "02",
    title: "Hey, Blue! — Software Engineer Intern",
    description:
      "Used React Native to create crucial features such as user login, phone authentication, and news posts creation on an app, fostering police-community interactions. Developed workplace responsibility and time management to meet company deadlines.",
    tech: ["React", "TypeScript", "Firebase"],
    link: "https://heyblue.us/",
  },
  {
    index: "03",
    title: "MentoraConnect (In Progress)",
    description:
      "Developing a website that uses AI-based matchmaking to help tutors of various subjects connect to students.",
    tech: ["Python", "Machine Learning", "TypeScript"],
    link: "https://mentoraconnect.netlify.app/",
  },
  {
    index: "04",
    title: "Pneumodetect",
    description: "Led a team of 6 students in creating a pneumonia detector through the use of various Python libraries. Coordinated efforts and organized deadlines for teammates. Implemented coding solutions utilizing convolutional neural networks and conducted targeted data analysis for findings. Presented data in confusion matrices to show our detector’s success.",
    tech: ["Python", "Matplotlib", "Numpy", "Pandas", "Seaborn", "CV2", "Tensorflow"],
    link: "https://pneumodetector.streamlit.app/",
  }
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