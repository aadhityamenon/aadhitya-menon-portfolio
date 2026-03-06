import { useState } from "react";
import heyblue from "../assets/heyblue.png";
import mentoraconnect from "../assets/mentora.png";
import pneumodetect from "../assets/pneumodetect.png";
import ElectricBorder from '../components/ElectricBorder';

type Project = {
  index: string;
  title: string;
  description: string;
  detail: string;
  tech: string[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    index: "01",
    title: "AI Misinformation Detector",
    description: "NLP-based model to detect misinformation with 92.3% accuracy.",
    detail:
      "Built an NLP-based model using logistic regression to detect misinformation with 92.3% accuracy. Designed the full data pipeline from preprocessing to evaluation. Used by 50+ high school students to enhance their research precision in various fields.",
    tech: ["Python", "scikit-learn", "NLP", "Logistic Regression"],
    image: undefined,
    link: "https://docs.google.com/document/d/1OAHky6uaVVYbb084GjncF5apxJc-1xMG/edit?usp=sharing&ouid=101104644244540031085&rtpof=true&sd=true",
  },

  {
    index: "02",
    title: "Hey, Blue! — Software Engineer Intern",
    description: "App to foster community-police interaction.",
    detail:
      "Used React Native to create crucial features such as user login, phone authentication, and news posts creation on an app, fostering police-community interactions. Developed workplace responsibility and time management to meet company deadlines.",
    tech: ["React", "TypeScript", "Firebase"],
    image: heyblue,
    link: "https://heyblue.us/",
  },
  {
    index: "03",
    title: "MentoraConnect (In Progress)",
    description: "AI-based tutor platform for tutors and students.",
    detail:
      "Developing a website that uses AI-based matchmaking to help tutors of various subjects connect to students.",
    tech: ["Python", "Machine Learning", "TypeScript"],
    image: mentoraconnect,
    link: "https://mentoraconnect.netlify.app/",
  },

  {
    index: "04",
    title: "Pneumodetect",
    description: "Pneumonia detector using CNNs and data analysis.",
    detail: "Led a team of 6 students in creating a pneumonia detector through the use of various Python libraries. Coordinated efforts and organized deadlines for teammates. Implemented coding solutions utilizing convolutional neural networks and conducted targeted data analysis for findings. Presented data in confusion matrices to show our detector’s success.",
    tech: ["Python", "Matplotlib", "Numpy", "Pandas", "Seaborn", "CV2", "Tensorflow"],
    image: pneumodetect,
    link: "https://pneumodetector.streamlit.app/",
  }
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
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
          {projects.map((project) => {
            const isSelected = selected?.index === project.index;

            const row = (
              <div
                key={project.index}
                onClick={() => setSelected(project)}
                onMouseEnter={() => setHovered(project.index)}
                onMouseLeave={() => setHovered(null)}
                className="py-12 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 group cursor-pointer hover:bg-stone-50 -mx-4 px-4 transition-colors"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-stone-300 pt-1">
                  {project.index}
                </span>

                <div>
                  <h2 className="text-xl font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-stone-500 text-sm leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-[family-name:var(--font-mono)] text-xs px-2 py-1 border border-stone-200 text-stone-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 text-xs text-stone-400 group-hover:text-stone-600 transition-colors">
                    View details →
                  </span>
                </div>
              </div>
            );

            const isHighlighted = hovered === project.index;

            return isHighlighted ? (
              <ElectricBorder
                key={project.index}
                color="#7df9ff"
                speed={1}
                chaos={0.12}
                thickness={2}
                style={{ borderRadius: 8 }}
              >
                {row}
              </ElectricBorder>
            ) : row;
          })}
          </div>
        </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-56 object-cover object-top"
              />
            )}

            <div className="p-8">
              {/* Modal header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 uppercase tracking-widest">
                    {selected.index}
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl mt-1">
                    {selected.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="font-[family-name:var(--font-mono)] text-xs text-stone-400 hover:text-stone-900 transition-colors mt-1"
                >
                  ✕ Close
                </button>
              </div>

              {/* Detail */}
              <p className="text-stone-600 leading-relaxed text-sm">
                {selected.detail}
              </p>

              {/* Tech */}
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="font-[family-name:var(--font-mono)] text-xs px-2 py-1 border border-stone-200 text-stone-500"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-xs text-stone-400 underline underline-offset-4 hover:text-stone-900 transition-colors"
                >
                  View project →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}