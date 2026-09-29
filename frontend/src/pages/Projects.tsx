import { useState } from "react";
import heyblue from "../assets/heyblue.webp";
import mentoraconnect from "../assets/mentora.webp";
import pneumodetect from "../assets/pneumodetect.webp";
import ElectricBorder from '../components/ElectricBorder';

/* Project type */
type Project = {
  index: string;
  title: string;
  description: string;
  detail: string;
  tech: string[];
  image?: string;
  link?: string;
}

{/* Work & research experience */}
const work: Project[] = [
  {
    index: "01",
    title: "Aquila Clouds — Software Engineer Intern",
    description: "Rewrote a legacy Java billing platform in Python, across AWS and GCP.",
    detail:
      "Rewrote Aquila Clouds' AWS and GCP billing, performance-metrics, and inventory collectors from a legacy Java system into Python, unifying them under a shared PostgreSQL data model. Tracked down a cross-account AWS auth failure and an IAM permissions gap, and fixed two database bugs that were quietly leaving fields null and inventory tables empty. Traced three confusing production errors in the old Java platform back to their root causes — bad database views, a schema mismatch, and a swallowed exception — and validated the new pipeline against it end-to-end.",
    tech: ["Python", "AWS", "GCP", "PostgreSQL"],
  },
  {
    index: "02",
    title: "Shah Lab — Undergraduate AI/ML Researcher",
    description: "Studying reinforcement learning approaches to sepsis treatment.",
    detail:
      "Reading through recent clinical ML literature on deep reinforcement learning for sepsis treatment to understand where current approaches fall short. Working on independent research questions around off-policy learning, looking for ways to help models adapt better when trained on external clinical policies.",
    tech: ["PyTorch", "Pandas", "TensorFlow", "Reinforcement Learning"],
  },
  {
    index: "03",
    title: "Beckman Laser Institute — Undergraduate AI/ML Researcher",
    description: "Building an ML pipeline to validate object-matching in medical imaging.",
    detail:
      "Building a machine learning pipeline that pairs a Random Forest pixel classifier with morphological filters to validate spatial overlap and object matching. Rewrote the evaluation step as a vectorized 2D label histogram intersection instead of nested loops, cutting processing time across thousands of high-resolution images. Also built an automated Seaborn violin-plot workflow so the team can see how model performance is actually distributed, not just averaged.",
    tech: ["Python", "scikit-learn", "NumPy", "Seaborn"],
  },
  {
    index: "04",
    title: "Inspirit AI — AI/ML Research Assistant",
    description: "NLP model that flags misinformation with 92.3% accuracy.",
    detail:
      "Built an NLP model using logistic regression that detects misinformation with 92.3% accuracy. Designed an automated scoring system that cut down manual verification work for 20+ student researchers, and documented the model's performance and confusion matrix results so the approach could be reused in classroom research projects.",
    tech: ["Python", "scikit-learn", "NLP", "Logistic Regression"],
    link: "https://docs.google.com/document/d/1OAHky6uaVVYbb084GjncF5apxJc-1xMG/edit?usp=sharing&ouid=101104644244540031085&rtpof=true&sd=true",
  },
  {
    index: "05",
    title: "Hey, Blue! — Software Engineer Intern",
    description: "Shipped auth and posting features for a community-police app.",
    detail:
      "Built user authentication, phone verification, and post-creation features for Hey, Blue!'s React Native app, which helps communities and local police interact more directly.",
    tech: ["React Native", "JavaScript"],
    image: heyblue,
    link: "https://heyblue.us/",
  },
];

{/* Personal / team projects */}
const projects: Project[] = [
  {
    index: "01",
    title: "TutorConnect",
    description: "AI-matchmaking platform pairing students with tutors.",
    detail:
      "A platform that uses AI matchmaking to connect students with tutors based on subject expertise and learning style, aiming to make quality tutoring more accessible.",
    tech: ["Python", "Machine Learning", "TypeScript"],
    image: mentoraconnect,
    link: "https://mentoraconnect.netlify.app/",
  },
  {
    index: "02",
    title: "Pneumodetector",
    description: "CNN-based pneumonia detector built from chest X-rays.",
    detail:
      "Led a team building a convolutional neural network that detects pneumonia from chest X-rays. Handled the data analysis and evaluation myself, using confusion matrices to show how well the model actually performed.",
    tech: ["Python", "Matplotlib", "NumPy", "Pandas", "Seaborn", "CV2", "TensorFlow"],
    image: pneumodetect,
    link: "https://pneumodetector.streamlit.app/",
  },
];

export default function Projects() {
  const [tab, setTab] = useState<"work" | "projects">("work");
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null); // For electric border effect
  const items = tab === "work" ? work : projects;
  return (
    <main className="flex-1 pt-14">
      <div className="relative w-full overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="border-b border-stone-200 pb-8 mb-10">
            <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 tracking-widest uppercase">
              Selected
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl mt-4">
              Work &amp; Projects
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 mb-16">
            <button
              onClick={() => setTab("work")}
              className={`text-sm tracking-wide transition-colors ${
                tab === "work" ? "text-stone-900 font-medium" : "text-stone-400 hover:text-stone-900"
              }`}
            >
              Work &amp; Research
            </button>
            <button
              onClick={() => setTab("projects")}
              className={`text-sm tracking-wide transition-colors ${
                tab === "projects" ? "text-stone-900 font-medium" : "text-stone-400 hover:text-stone-900"
              }`}
            >
              Projects
            </button>
          </div>

          {/* Project list */}
          <div className="divide-y divide-stone-200">
            {items.map((project) => {

              const row = (
                <div
                  key={project.index}
                  onClick={() => setSelected(project)} // Enables the project popup on click
                  onMouseEnter={() => setHovered(project.index)} // Creates electric border effect on hover
                  onMouseLeave={() => setHovered(null)} // Removes electric border when mouse moves away
                  className="py-12 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 group cursor-pointer hover:bg-stone-50 -mx-4 px-4 transition-colors"
                >
                  {/* Display of projects without popup */}
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

              // Creates electric border effect
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

        {/* Modal/popup effect */}
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
      </div>
    </main>
  );
}